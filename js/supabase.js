// ═══════════════════════════════════════════════════════
// GLOBALDOC — Configuration Supabase
// ═══════════════════════════════════════════════════════

const SUPABASE_URL = 'https://zalkgxqjsjpbeqflgxbn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGtneHFqc2pwYmVxZmxneGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODM4MzAsImV4cCI6MjA4Nzk1OTgzMH0.58oMq-G3QWts07CM-exvS0JB4IEPV3ROSFmwE252ohw';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── CONSTANTES ──────────────────────────────────────────
const ADMIN_CODE = "DGDCI_ADMIN_2025";
const WHATSAPP_NUMBER = "2250142116172";

// ── UTILITAIRES ─────────────────────────────────────────
function generateId() {
  return 'GD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatTimeShort(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function redirectWhatsApp(message = '') {
  const text = encodeURIComponent(message || 'Bonjour GlobalDoc, je souhaite utiliser vos services.');
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

// ── SESSION LOCALE ───────────────────────────────────────
function getSession() {
  try { return JSON.parse(localStorage.getItem('gdoc_user')) || null; } catch { return null; }
}
function setSession(user) {
  localStorage.setItem('gdoc_user', JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem('gdoc_user');
}
function isAdmin(user) {
  return user && user.code === ADMIN_CODE;
}

// ── STATUT EN LIGNE ─────────────────────────────────────
async function setOnlineStatus(userId, online) {
  if (!userId || userId === 'admin') return;
  await db.from('users').update({ online, last_seen: new Date().toISOString() }).eq('id', userId);
}
