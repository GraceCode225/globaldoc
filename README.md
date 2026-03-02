# 🚀 Guide de mise en ligne — DGD.CI GlobalDoc

## Ce que contient ce dossier

```
globaldoc/
├── index.html          ← Page d'accueil
├── services.html       ← Page services
├── tarifs.html         ← Page tarifs
├── commander.html      ← Commande intelligente
├── compte.html         ← Inscription / Connexion
├── messagerie.html     ← Messages utilisateur
├── bibliotheque.html   ← Bibliothèque PDF
├── communaute.html     ← Commentaires
├── admin.html          ← Tableau de bord admin
├── licence.html        ← À propos / Djeket Bogui Joël
├── css/style.css       ← Design global
├── js/
│   ├── firebase.js     ← ⚠️ À CONFIGURER
│   ├── sounds.js       ← Sons discrets
│   └── app.js          ← Fonctions partagées
└── assets/logo.svg     ← Logo DGD.CI
```

---

## ÉTAPE 1 — Configurer Firebase (gratuit)

### 1.1 Créer le projet Firebase

1. Va sur **https://firebase.google.com**
2. Clique sur **"Commencer"** et connecte-toi avec ton Gmail
3. Clique sur **"Créer un projet"**
4. Nomme-le **"globaldoc"**
5. Désactive Google Analytics (pas nécessaire) et crée le projet

### 1.2 Configurer la base de données

1. Dans le menu de gauche → **"Realtime Database"**
2. Clique **"Créer une base de données"**
3. Choisis la région **"Europe-West1"** ou la plus proche
4. Sélectionne **"Mode test"** (on changera les règles après)
5. Clique **"Activer"**

### 1.3 Configurer le stockage (pour les PDFs)

1. Dans le menu de gauche → **"Storage"**
2. Clique **"Commencer"**
3. Mode test → **"Suivant"** → **"Terminer"**

### 1.4 Récupérer ta configuration

1. Dans Firebase → ⚙️ **"Paramètres du projet"**
2. Descends jusqu'à **"Vos applications"**
3. Clique sur **"</>"** (icône web)
4. Nomme l'app **"globaldoc-web"** → **"Enregistrer"**
5. Tu verras un code comme celui-ci — **copie-le** :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "globaldoc-xxxxx.firebaseapp.com",
  databaseURL: "https://globaldoc-xxxxx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "globaldoc-xxxxx",
  storageBucket: "globaldoc-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 1.5 Coller ta configuration dans le site

Ouvre le fichier **`js/firebase.js`** et remplace les lignes :
```javascript
const firebaseConfig = {
  apiKey: "TA_API_KEY",
  ...
```
Par ta vraie configuration Firebase.

### 1.6 Changer le code admin (IMPORTANT !)

Dans **`js/firebase.js`**, ligne :
```javascript
const ADMIN_CODE = "DGDCI_ADMIN_2025";
```
Remplace **"DGDCI_ADMIN_2025"** par un code secret de ton choix.
**Ne le partage avec personne !** C'est ton mot de passe admin.

---

## ÉTAPE 2 — Mettre en ligne sur GitHub Pages (gratuit)

### 2.1 Créer un compte GitHub

Va sur **https://github.com** et crée un compte gratuit.

### 2.2 Créer un dépôt

1. Clique sur **"New repository"**
2. Nomme-le **"globaldoc"** (ou **"dgdci"**)
3. Coche **"Public"**
4. Clique **"Create repository"**

### 2.3 Uploader les fichiers

**Option A — Via le site GitHub (plus facile) :**
1. Dans ton dépôt → **"uploading an existing file"**
2. Glisse-dépose tout le dossier **globaldoc/**
3. Clique **"Commit changes"**

**Option B — Via GitHub Desktop (recommandé) :**
1. Télécharge **GitHub Desktop** sur https://desktop.github.com
2. Clone ton dépôt
3. Copie tes fichiers dedans
4. Clique **"Commit"** puis **"Push"**

### 2.4 Activer GitHub Pages

1. Dans ton dépôt → **"Settings"**
2. Dans le menu gauche → **"Pages"**
3. Source → **"Deploy from a branch"**
4. Branch → **"main"** → **"/ (root)"**
5. Clique **"Save"**

### 2.5 Ton site est en ligne ! 🎉

GitHub te donnera une URL comme :
```
https://TON_PSEUDO.github.io/globaldoc/
```

C'est l'adresse de ton site. Partage-la !

---

## ÉTAPE 3 — Se connecter comme Admin

1. Va sur ton site
2. Clique **"Connexion"**
3. Entre n'importe quel nom (ex: "Joël")
4. Entre ton code admin secret
5. Tu seras automatiquement redirigé vers le tableau de bord admin

---

## Règles de sécurité Firebase (après les tests)

Quand ton site fonctionne bien, va dans Firebase → Realtime Database → Règles et remplace par :

```json
{
  "rules": {
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "commandes": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "communaute": {
      ".read": true,
      ".write": "auth != null"
    },
    "annonces": {
      ".read": true,
      ".write": "auth != null"
    },
    "videos": {
      ".read": true,
      ".write": "auth != null"
    },
    "bibliotheque": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

---

## Support

Des questions ? Contacte-moi :
- 📞 +225 0142116172
- ✉️ rayc70510@gmail.com
- 💬 WhatsApp : wa.me/2250142116172

© 2025 DGD.CI — GlobalDoc — Djeket Bogui Joël
