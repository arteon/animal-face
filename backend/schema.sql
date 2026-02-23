-- Animal Face Test - Database Schema
-- Target: AWS RDS PostgreSQL

CREATE TABLE IF NOT EXISTS animal_face_results (
    id          SERIAL PRIMARY KEY,
    animal_id   VARCHAR(50) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for statistics queries
CREATE INDEX IF NOT EXISTS idx_animal_face_results_animal_id
    ON animal_face_results (animal_id);

CREATE INDEX IF NOT EXISTS idx_animal_face_results_created_at
    ON animal_face_results (created_at DESC);

-- Optional: Daily aggregation view for performance
CREATE OR REPLACE VIEW animal_face_daily_stats AS
SELECT
    animal_id,
    DATE(created_at) AS date,
    COUNT(*) AS count
FROM animal_face_results
GROUP BY animal_id, DATE(created_at)
ORDER BY date DESC, count DESC;
