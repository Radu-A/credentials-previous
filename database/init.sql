CREATE TABLE IF NOT EXISTS connected_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    credential VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE (credential, email)
);