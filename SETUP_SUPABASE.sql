-- ═══════════════════════════════════════════════════════
-- GLOBALDOC — Tables Supabase
-- Copie ce code dans Supabase > SQL Editor > New Query
-- ═══════════════════════════════════════════════════════

-- Table utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  online BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Table commandes
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

-- Table messages (chat des commandes)
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  commande_id TEXT,
  text TEXT,
  sender TEXT,
  sender_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table annonces
CREATE TABLE IF NOT EXISTS annonces (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT,
  contenu TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table videos
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table bibliotheque PDF
CREATE TABLE IF NOT EXISTS bibliotheque (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT,
  description TEXT,
  url TEXT,
  size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table communaute (commentaires)
CREATE TABLE IF NOT EXISTS communaute (
  id BIGSERIAL PRIMARY KEY,
  text TEXT,
  user_id TEXT,
  user_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table demandes PDF
CREATE TABLE IF NOT EXISTS demandes_pdf (
  id BIGSERIAL PRIMARY KEY,
  demande TEXT,
  user_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer lecture publique sur certaines tables
ALTER TABLE annonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE bibliotheque ENABLE ROW LEVEL SECURITY;
ALTER TABLE communaute ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Politiques : lecture publique
CREATE POLICY "Lecture publique annonces" ON annonces FOR SELECT USING (true);
CREATE POLICY "Lecture publique videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Lecture publique bibliotheque" ON bibliotheque FOR SELECT USING (true);
CREATE POLICY "Lecture publique communaute" ON communaute FOR SELECT USING (true);
CREATE POLICY "Lecture publique users" ON users FOR SELECT USING (true);
CREATE POLICY "Lecture publique commandes" ON commandes FOR SELECT USING (true);
CREATE POLICY "Lecture publique messages" ON messages FOR SELECT USING (true);

-- Politiques : ecriture publique (pour que le site puisse enregistrer)
CREATE POLICY "Ecriture publique annonces" ON annonces FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique videos" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique bibliotheque" ON bibliotheque FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique communaute" ON communaute FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique commandes" ON commandes FOR INSERT WITH CHECK (true);
CREATE POLICY "Ecriture publique messages" ON messages FOR INSERT WITH CHECK (true);

-- Politiques : modification
CREATE POLICY "Modification users" ON users FOR UPDATE USING (true);
CREATE POLICY "Modification commandes" ON commandes FOR UPDATE USING (true);

-- Politiques : suppression
CREATE POLICY "Suppression annonces" ON annonces FOR DELETE USING (true);
CREATE POLICY "Suppression videos" ON videos FOR DELETE USING (true);
CREATE POLICY "Suppression bibliotheque" ON bibliotheque FOR DELETE USING (true);
CREATE POLICY "Suppression communaute" ON communaute FOR DELETE USING (true);
CREATE POLICY "Suppression users" ON users FOR DELETE USING (true);
