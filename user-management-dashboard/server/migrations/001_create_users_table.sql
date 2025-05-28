CREATE TABLE users(
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      last_login TIMESTAMP,
                      status VARCHAR(20) NOT NULL DEFAULT 'active',
                      created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX users_email_idx ON users(email);
