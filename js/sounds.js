// ═══════════════════════════════════════════════════════
// GLOBALDOC — Sons discrets
// ═══════════════════════════════════════════════════════

let soundEnabled = localStorage.getItem('gdoc_sound') !== 'off';
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.12) {
  if (!soundEnabled) return;
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.8, ac.currentTime + duration);
    gain.gain.setValueAtTime(volume, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (e) {}
}

const Sounds = {
  // Ding élégant à l'ouverture
  welcome() {
    playTone(523, 0.15, 'sine', 0.1);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 160);
    setTimeout(() => playTone(784, 0.25, 'sine', 0.1), 320);
  },

  // Clic satisfaisant sur bouton
  click() {
    playTone(880, 0.08, 'sine', 0.08);
  },

  // Notification message entrant
  message() {
    playTone(660, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(880, 0.15, 'sine', 0.1), 120);
  },

  // Confirmation succès
  success() {
    playTone(523, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 110);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.1), 220);
  },

  // Erreur douce
  error() {
    playTone(300, 0.2, 'sine', 0.08);
    setTimeout(() => playTone(250, 0.2, 'sine', 0.08), 220);
  },

  // Transition de page
  page() {
    playTone(440, 0.12, 'sine', 0.07);
  }
};

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('gdoc_sound', soundEnabled ? 'on' : 'off');
  const btn = document.getElementById('soundBtn');
  if (btn) btn.textContent = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled) Sounds.click();
}

// Ajouter son à tous les boutons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => Sounds.click());
  });

  // Son de bienvenue au chargement
  setTimeout(() => Sounds.welcome(), 500);

  // Mettre à jour icône son
  const soundBtn = document.getElementById('soundBtn');
  if (soundBtn) soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
});
