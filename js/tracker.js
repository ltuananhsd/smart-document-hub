// ═══════════════════════════════════════
//  TRACKER — Event Tracking + Lead Scoring
// ═══════════════════════════════════════
'use strict';

const EVENTS_KEY = 'dh_events';
const SESSION_ID = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
let _heartbeatTimer = null;
let _viewStartTime = null;
let _currentDocId = null;

// ─── Event Tracking ──────────────────────────────────────────────────────────
function trackEvent(eventType, docId, extraMeta = {}) {
    const user = getCurrentUser();
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');

    // Dedupe by session+type+doc (except heartbeat & view_end)
    if (!['doc_heartbeat', 'doc_view_end', 'doc_preview_start'].includes(eventType)) {
        const dup = events.find(e => e.session_id === SESSION_ID && e.event_type === eventType && e.doc_id === docId);
        if (dup) return;
    }

    const entry = {
        event_id: 'ev_' + Date.now(),
        user_id: user ? user.user_id : null,
        doc_id: docId,
        event_type: eventType,
        session_id: SESSION_ID,
        duration_sec: extraMeta.duration_sec || 0,
        metadata: JSON.stringify(extraMeta),
        created_at: new Date().toISOString()
    };
    events.push(entry);
    // Keep last 500 events
    if (events.length > 500) events.splice(0, events.length - 500);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

    // Update counts on doc
    if (['doc_view_start', 'doc_view_end'].includes(eventType)) incrementDocStat(docId, 'view_count');
    if (eventType === 'doc_download_success') incrementDocStat(docId, 'download_count');

    // Trigger scoring after impactful events
    if (user && ['doc_view_end', 'doc_download_success', 'doc_preview_start'].includes(eventType)) {
        setTimeout(() => { calcLeadScore(user.user_id); updateUserTags(user.user_id); }, 0);
    }
}

function incrementDocStat(docId, stat) {
    const docs = getAllDocuments();
    const doc = docs.find(d => d.doc_id === docId);
    if (doc) { doc[stat] = (doc[stat] || 0) + 1; saveDocuments(docs); }
}

// ─── View Session Helpers ────────────────────────────────────────────────────
function startViewSession(docId) {
    _currentDocId = docId; _viewStartTime = Date.now();
    trackEvent('doc_view_start', docId);
    _heartbeatTimer = setInterval(() => {
        if (document.visibilityState !== 'hidden') {
            const dur = Math.floor((Date.now() - _viewStartTime) / 1000);
            trackEvent('doc_heartbeat', docId, { duration_sec: dur });
        }
    }, 12000);
}
function endViewSession(docId) {
    if (_heartbeatTimer) { clearInterval(_heartbeatTimer); _heartbeatTimer = null; }
    const dur = _viewStartTime ? Math.floor((Date.now() - _viewStartTime) / 1000) : 0;
    trackEvent('doc_view_end', docId, { duration_sec: dur });
    _viewStartTime = null; _currentDocId = null;
    return dur;
}
function startPreviewSession(docId) {
    _currentDocId = docId; _viewStartTime = Date.now();
    trackEvent('doc_preview_start', docId);
    _heartbeatTimer = setInterval(() => {
        if (document.visibilityState !== 'hidden') {
            const dur = Math.floor((Date.now() - _viewStartTime) / 1000);
            trackEvent('doc_heartbeat', docId, { duration_sec: dur });
        }
    }, 12000);
}
function requestDownload(docId) {
    trackEvent('doc_download_request', docId);
    const signedUrl = `#download?doc=${docId}&token=mock_${Date.now()}`;
    setTimeout(() => trackEvent('doc_download_success', docId), 1000);
    return signedUrl;
}

// ─── Lead Scoring ─────────────────────────────────────────────────────────────
function calcLeadScore(userId) {
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    const userEvts = events.filter(e => e.user_id === userId);
    const now = Date.now(); let score = 0;
    const downloadedDocs = new Set();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    userEvts.forEach(e => {
        const age = now - new Date(e.created_at).getTime();
        const recent = age < sevenDaysMs;
        if (e.event_type === 'doc_detail_view') score += 1;
        if (e.event_type === 'doc_preview_start') score += 2;
        if (e.event_type === 'doc_view_end') {
            const d = e.duration_sec || 0;
            if (d >= 180) score += 10;
            else if (d >= 60) score += 5;
        }
        if (e.event_type === 'doc_download_success' && recent) {
            if (!downloadedDocs.has(e.doc_id)) { score += 20; downloadedDocs.add(e.doc_id); }
        }
    });

    // Recency decay: no activity in 7d → -20%
    const lastEvt = userEvts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    if (lastEvt) {
        const daysSince = (now - new Date(lastEvt.created_at).getTime()) / (24 * 60 * 60 * 1000);
        if (daysSince > 7) score = Math.floor(score * 0.8);
        if (daysSince > 14) score = Math.floor(score * 0.7);
    }

    score = Math.min(score, 200);
    const stage = score > 50 ? 'Hot' : score >= 11 ? 'Warm' : 'Cold';
    const users = getAllUsers(); const idx = users.findIndex(u => u.user_id === userId);
    if (idx !== -1) { users[idx].lead_score = score; users[idx].lead_stage = stage; saveUsers(users); }
    return { score, stage };
}

function updateUserTags(userId) {
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000; const now = Date.now();
    const recentEvts = events.filter(e => e.user_id === userId && (now - new Date(e.created_at).getTime()) < sevenDaysMs);

    // Count views/downloads per topic
    const topicViews = {}; const topicDls = {};
    recentEvts.filter(e => ['doc_view_start', 'doc_view_end', 'doc_preview_start'].includes(e.event_type)).forEach(e => {
        const doc = getDocument(e.doc_id); if (!doc) return;
        topicViews[doc.topic] = (topicViews[doc.topic] || 0) + 1;
    });
    recentEvts.filter(e => e.event_type === 'doc_download_success').forEach(e => {
        const doc = getDocument(e.doc_id); if (!doc) return;
        topicDls[doc.topic] = (topicDls[doc.topic] || 0) + 1;
    });

    const tags = [];
    Object.keys(topicViews).forEach(t => { if (topicViews[t] >= 2) tags.push('Interest_' + t.replace(/[\s&\/]+/g, '_')); });
    Object.keys(topicDls).forEach(t => { const tag = 'DL_' + t.replace(/[\s&\/]+/g, '_'); if (!tags.includes(tag)) tags.push(tag); });

    const users = getAllUsers(); const idx = users.findIndex(u => u.user_id === userId);
    if (idx !== -1) { users[idx].tags = [...new Set(tags)]; saveUsers(users); }
}

function getUserActivityHistory(userId) {
    const events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
    return events.filter(e => e.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}
