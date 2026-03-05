-- ═══════════════════════════════════════════════════════
-- NOUVELLES TABLES — À exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- Ajouter colonnes prix et image à la bibliothèque
ALTER TABLE bibliotheque ADD COLUMN IF NOT EXISTS prix INTEGER DEFAULT 1000;
ALTER TABLE bibliotheque ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE bibliotheque ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- Table avis PDF (étoiles + commentaires)
CREATE TABLE IF NOT EXISTS avis_pdf (
  id BIGSERIAL PRIMARY KEY,
  pdf_id BIGINT,
  user_id TEXT,
  user_name TEXT,
  etoiles INTEGER DEFAULT 5,
  commentaire TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table achats PDF (pour confirmer paiement Wave)
CREATE TABLE IF NOT EXISTS achats_pdf (
  id BIGSERIAL PRIMARY KEY,
  pdf_id BIGINT,
  pdf_titre TEXT,
  user_id TEXT,
  user_name TEXT,
  montant INTEGER,
  capture_url TEXT,
  statut TEXT DEFAULT 'en_attente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table likes PDF
CREATE TABLE IF NOT EXISTS likes_pdf (
  id BIGSERIAL PRIMARY KEY,
  pdf_id BIGINT,
  user_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Désactiver RLS sur nouvelles tables
ALTER TABLE avis_pdf DISABLE ROW LEVEL SECURITY;
ALTER TABLE achats_pdf DISABLE ROW LEVEL SECURITY;
ALTER TABLE likes_pdf DISABLE ROW LEVEL SECURITY;

