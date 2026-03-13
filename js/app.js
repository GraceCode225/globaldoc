// ═══════════════════════════════════════════════════════
// GLOBALDOC — Fonctions partagées (Supabase uniquement)
// ═══════════════════════════════════════════════════════

// showToast est défini dans chaque page pour éviter les conflits
// Fonctions utilitaires globales uniquement ici

function redirectWhatsApp(message) {
  const text = encodeURIComponent(message || 'Bonjour GlobalDoc, je souhaite utiliser vos services.');
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank');
}

// Sons (silencieux si non supporté)
const Sounds = {
  click: () => {},
  success: () => {},
  error: () => {},
  message: () => {}
};
