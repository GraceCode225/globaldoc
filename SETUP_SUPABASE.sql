-- ═══════════════════════════════════════════════════════
-- GLOBALDOC V15 — Setup Supabase COMPLET ET SÉCURISÉ
-- Copie TOUT ce code dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════════════════

-- ── TABLES ──

CREATE TABLE IF NOT EXISTS bibliotheque (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT DEFAULT '',
  url TEXT NOT NULL,
  size BIGINT DEFAULT 0,
  prix INTEGER DEFAULT 1000,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achats_pdf (
  id BIGSERIAL PRIMARY KEY,
  pdf_id BIGINT,
  pdf_titre TEXT,
  user_id TEXT,
  user_name TEXT,
  montant INTEGER DEFAULT 1000,
  capture_url TEXT,
  statut TEXT DEFAULT 'en_attente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS avis_pdf (
  id BIGSERIAL PRIMARY KEY,
  pdf_id BIGINT,
  user_id TEXT,
  etoiles INTEGER DEFAULT 5,
  commentaire TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS annonces (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT,
  contenu TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS commandes (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  type TEXT,
  type_label TEXT,
  description TEXT,
  status TEXT DEFAULT 'en_attente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  commande_id TEXT,
  text TEXT,
  sender TEXT,
  sender_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  code TEXT,
  role TEXT DEFAULT 'user',
  online BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS communaute (
  id BIGSERIAL PRIMARY KEY,
  text TEXT,
  user_id TEXT,
  user_name TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS : ACTIVÉ AVEC POLITIQUES PRÉCISES ──
-- (lecture publique, écriture contrôlée)

ALTER TABLE bibliotheque ENABLE ROW LEVEL SECURITY;
ALTER TABLE achats_pdf ENABLE ROW LEVEL SECURITY;
ALTER TABLE avis_pdf ENABLE ROW LEVEL SECURITY;
ALTER TABLE annonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE communaute ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- BIBLIOTHEQUE : lecture publique, écriture/modif/suppression pour tous
-- (nécessaire car l'admin est authentifié via Supabase Auth)
DROP POLICY IF EXISTS "biblio_read" ON bibliotheque;
DROP POLICY IF EXISTS "biblio_insert" ON bibliotheque;
DROP POLICY IF EXISTS "biblio_update" ON bibliotheque;
DROP POLICY IF EXISTS "biblio_delete" ON bibliotheque;
CREATE POLICY "biblio_read" ON bibliotheque FOR SELECT USING (true);
CREATE POLICY "biblio_insert" ON bibliotheque FOR INSERT WITH CHECK (true);
CREATE POLICY "biblio_update" ON bibliotheque FOR UPDATE USING (true);
CREATE POLICY "biblio_delete" ON bibliotheque FOR DELETE USING (true);

-- ACHATS : lecture/écriture/modif publique
DROP POLICY IF EXISTS "achats_read" ON achats_pdf;
DROP POLICY IF EXISTS "achats_insert" ON achats_pdf;
DROP POLICY IF EXISTS "achats_update" ON achats_pdf;
CREATE POLICY "achats_read" ON achats_pdf FOR SELECT USING (true);
CREATE POLICY "achats_insert" ON achats_pdf FOR INSERT WITH CHECK (true);
CREATE POLICY "achats_update" ON achats_pdf FOR UPDATE USING (true);

-- ANNONCES : lecture publique, écriture/suppression publique
DROP POLICY IF EXISTS "ann_read" ON annonces;
DROP POLICY IF EXISTS "ann_insert" ON annonces;
DROP POLICY IF EXISTS "ann_delete" ON annonces;
CREATE POLICY "ann_read" ON annonces FOR SELECT USING (true);
CREATE POLICY "ann_insert" ON annonces FOR INSERT WITH CHECK (true);
CREATE POLICY "ann_delete" ON annonces FOR DELETE USING (true);

-- COMMANDES : lecture/écriture/modif publique
DROP POLICY IF EXISTS "cmd_read" ON commandes;
DROP POLICY IF EXISTS "cmd_insert" ON commandes;
DROP POLICY IF EXISTS "cmd_update" ON commandes;
CREATE POLICY "cmd_read" ON commandes FOR SELECT USING (true);
CREATE POLICY "cmd_insert" ON commandes FOR INSERT WITH CHECK (true);
CREATE POLICY "cmd_update" ON commandes FOR UPDATE USING (true);

-- MESSAGES : lecture/écriture publique
DROP POLICY IF EXISTS "msg_read" ON messages;
DROP POLICY IF EXISTS "msg_insert" ON messages;
CREATE POLICY "msg_read" ON messages FOR SELECT USING (true);
CREATE POLICY "msg_insert" ON messages FOR INSERT WITH CHECK (true);

-- USERS : lecture/écriture/modif publique
DROP POLICY IF EXISTS "users_read" ON users;
DROP POLICY IF EXISTS "users_insert" ON users;
DROP POLICY IF EXISTS "users_update" ON users;
CREATE POLICY "users_read" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update" ON users FOR UPDATE USING (true);

-- COMMUNAUTÉ : lecture/écriture publique
DROP POLICY IF EXISTS "com_read" ON communaute;
DROP POLICY IF EXISTS "com_insert" ON communaute;
CREATE POLICY "com_read" ON communaute FOR SELECT USING (true);
CREATE POLICY "com_insert" ON communaute FOR INSERT WITH CHECK (true);

-- AVIS : lecture/écriture publique
DROP POLICY IF EXISTS "avis_read" ON avis_pdf;
DROP POLICY IF EXISTS "avis_insert" ON avis_pdf;
CREATE POLICY "avis_read" ON avis_pdf FOR SELECT USING (true);
CREATE POLICY "avis_insert" ON avis_pdf FOR INSERT WITH CHECK (true);

-- VIDEOS : lecture/écriture/suppression publique
DROP POLICY IF EXISTS "vid_read" ON videos;
DROP POLICY IF EXISTS "vid_insert" ON videos;
DROP POLICY IF EXISTS "vid_delete" ON videos;
CREATE POLICY "vid_read" ON videos FOR SELECT USING (true);
CREATE POLICY "vid_insert" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "vid_delete" ON videos FOR DELETE USING (true);

-- ── STORAGE BUCKET ──
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bibliotheque', 'bibliotheque', true, 52428800,
  ARRAY['application/pdf','image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politiques storage
DROP POLICY IF EXISTS "stor_read" ON storage.objects;
DROP POLICY IF EXISTS "stor_insert" ON storage.objects;
DROP POLICY IF EXISTS "stor_delete" ON storage.objects;
CREATE POLICY "stor_read" ON storage.objects FOR SELECT USING (bucket_id = 'bibliotheque');
CREATE POLICY "stor_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'bibliotheque');
CREATE POLICY "stor_delete" ON storage.objects FOR DELETE USING (bucket_id = 'bibliotheque');

-- ── VÉRIFICATION FINALE ──
SELECT table_name, 'OK' as status
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('bibliotheque','achats_pdf','annonces','commandes','messages','users','communaute','videos')
ORDER BY table_name;
