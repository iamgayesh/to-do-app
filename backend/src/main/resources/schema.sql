CREATE TABLE IF NOT EXISTS task (
                                    id          BIGSERIAL      PRIMARY KEY,
                                    title       VARCHAR(255)   NOT NULL,
    description TEXT           NOT NULL,
    completed   BOOLEAN        NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- Index for fast query: 5 most recent incomplete tasks
CREATE INDEX IF NOT EXISTS idx_task_completed_created
    ON task (completed, created_at DESC);