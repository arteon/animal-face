-- Add visitor information columns to animal_face_results
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS client_ip VARCHAR(45) DEFAULT '';
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS user_agent VARCHAR(512) DEFAULT '';
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS accept_language VARCHAR(128) DEFAULT '';
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS referer VARCHAR(512) DEFAULT '';
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS country VARCHAR(2) DEFAULT '';
ALTER TABLE animal_face_results ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Index on IP for analytics queries
CREATE INDEX IF NOT EXISTS idx_results_client_ip ON animal_face_results (client_ip);
CREATE INDEX IF NOT EXISTS idx_results_country ON animal_face_results (country);
CREATE INDEX IF NOT EXISTS idx_results_created_at ON animal_face_results (created_at);
