# GlobalDoc DGD.CI — V15

Application web de rédaction de documents professionnels en Côte d'Ivoire.

## Stack technique
- **Frontend** : HTML, CSS, JavaScript (Vanilla)
- **Backend** : Supabase (base de données, stockage, authentification)
- **Hébergement** : GitHub Pages

## Configuration Supabase
1. Créer un projet sur https://supabase.com
2. Dans **SQL Editor**, exécuter le fichier `SETUP_SUPABASE.sql`
3. Remplacer dans `js/supabase.js` :
   - `SUPABASE_URL` → votre URL Supabase
   - `SUPABASE_KEY` → votre clé anon publique

## Accès Admin
- URL : `/globaldoc/admin.html`
- Connexion via email/mot de passe Supabase Auth
- Créer un compte admin dans : Supabase > Authentification > Utilisateurs

## Structure
```
globaldoc/
├── index.html          → Accueil
├── bibliotheque.html   → Catalogue PDF
├── commander.html      → Commander un document
├── services.html       → Liste des services
├── tarifs.html         → Tarifs
├── compte.html         → Espace client
├── admin.html          → Tableau de bord admin
├── css/style.css       → Styles V15
├── js/supabase.js      → Configuration Supabase
├── js/app.js           → Fonctions partagées
├── sw.js               → Service Worker PWA
└── SETUP_SUPABASE.sql  → Script de création des tables
```

## Déploiement GitHub Pages
Push sur la branche `main` → disponible sur `gracecode225.github.io/globaldoc/`
