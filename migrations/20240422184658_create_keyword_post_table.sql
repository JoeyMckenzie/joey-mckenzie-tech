CREATE TABLE keyword_post_tmp (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    post_id BIGINT NOT NULL,
    keyword_id BIGINT NOT NULL
);

CREATE UNIQUE INDEX keyword_post_tmp_post_id_keyword_id_key
    ON keyword_post_tmp (post_id, keyword_id);
