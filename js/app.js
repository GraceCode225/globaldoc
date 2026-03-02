// ═══════════════════════════════════════════════════════
// GLOBALDOC — Fonctions partagées
// ═══════════════════════════════════════════════════════

// ── TOASTS ──────────────────────────────────────────────
function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);

  if (type === 'success') Sounds.success();
  else if (type === 'error') Sounds.error();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── NAVIGATION ACTIVE ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Vérification session
  const user = getSession();
  const authLinks = document.querySelectorAll('[data-auth]');
  authLinks.forEach(el => {
    const auth = el.getAttribute('data-auth');
    if (auth === 'logged' && !user) el.style.display = 'none';
    if (auth === 'guest' && user) el.style.display = 'none';
    if (auth === 'admin' && !isAdmin(user)) el.style.display = 'none';
  });

  // Nom utilisateur dans navbar
  if (user) {
    const userDisplay = document.getElementById('navUserName');
    if (userDisplay) userDisplay.textContent = user.name;
    setOnlineStatus(user.id, true);
  }

  // Intersection Observer pour animations au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe-animate').forEach(el => observer.observe(el));
});

// ── DÉCONNEXION ──────────────────────────────────────────
function logout() {
  const user = getSession();
  if (user) setOnlineStatus(user.id, false);
  clearSession();
  showToast('Déconnexion réussie', 'success');
  setTimeout(() => window.location.href = 'index.html', 1000);
}
