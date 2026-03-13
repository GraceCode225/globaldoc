// ═══════════════════════════════════════════════════════
// GLOBALDOC — Configuration Supabase (seul backend)
// ═══════════════════════════════════════════════════════
// NOTE : La clé anon Supabase est publique par conception.
// Elle ne permet que les opérations autorisées par RLS.
// L'accès admin est sécurisé par Supabase Auth (email/mot de passe).

const SUPABASE_URL = 'https://zalkgxqjsjpbeqflgxbn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGtneHFqc2pwYmVxZmxneGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODM4MzAsImV4cCI6MjA4Nzk1OTgzMH0.58oMq-G3QWts07CM-exvS0JB4IEPV3ROSFmwE252ohw';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── CONSTANTES ──
const WHATSAPP_NUMBER = '2250142116172';
const WAVE_NUMBER = '0501233818';

// ── UTILITAIRES ──
function generateId() {
  return 'GD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function formatTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function formatTimeShort(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function redirectWhatsApp(message) {
  const text = encodeURIComponent(message || 'Bonjour GlobalDoc, je souhaite utiliser vos services.');
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank');
}
