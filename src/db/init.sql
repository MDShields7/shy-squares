-- Shy sqaures web app (ss prefix)
DROP TABLE IF EXISTS ss_scores;

CREATE TABLE ss_scores (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_score INTEGER NOT NULL
)