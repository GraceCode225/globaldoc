// ═══════════════════════════════════════════════════════
// GLOBALDOC — Configuration Firebase
// ⚠️ Remplace ces valeurs par ta propre config Firebase
// ═══════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "TA_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  databaseURL: "https://TON_PROJET-default-rtdb.firebaseio.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

// Références globales
const db = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();

// ── CONSTANTES ──────────────────────────────────────────
const ADMIN_CODE = "DGDCI_ADMIN_2025"; // Code secret admin — change-le !
const WHATSAPP_NUMBER = "2250142116172";

// ── UTILITAIRES ─────────────────────────────────────────
function generateId() {
  return 'GD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatTimeShort(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function redirectWhatsApp(message = '') {
  const text = encodeURIComponent(message || 'Bonjour GlobalDoc, je souhaite utiliser vos services.');
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
}

// ── SESSION LOCALE ───────────────────────────────────────
function getSession() {
  try {
    return JSON.parse(localStorage.getItem('gdoc_user')) || null;
  } catch { return null; }
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

// ── MISE À JOUR DU STATUT EN LIGNE ──────────────────────
function setOnlineStatus(userId, online) {
  if (!userId) return;
  db.ref(`users/${userId}/online`).set(online);
  if (online) {
    db.ref(`users/${userId}/online`).onDisconnect().set(false);
    db.ref(`users/${userId}/lastSeen`).onDisconnect().set(Date.now());
  }
}
