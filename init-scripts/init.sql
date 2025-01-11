CREATE DATABASE keycloakdb;
CREATE USER keycloak WITH PASSWORD 'keycloak123';
GRANT ALL PRIVILEGES ON DATABASE keycloakdb TO keycloak;

-- Switch to the keycloakdb database
\c keycloakdb;

-- Grant usage and create privileges on the public schema
GRANT USAGE ON SCHEMA public TO keycloak;
GRANT CREATE ON SCHEMA public TO keycloak;

-- Grant all privileges on existing tables, sequences, and functions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO keycloak;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO keycloak;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO keycloak;

-- Ensure future tables, sequences, and functions inherit permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO keycloak;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO keycloak;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO keycloak;



CREATE DATABASE springbootdb;
CREATE USER springboot WITH PASSWORD 'springboot123';
GRANT ALL PRIVILEGES ON DATABASE springbootdb TO springboot;

-- Switch to the keycloakdb database
\c springbootdb;

-- Grant usage and create privileges on the public schema
GRANT USAGE ON SCHEMA public TO springboot;
GRANT CREATE ON SCHEMA public TO springboot;

-- Grant all privileges on existing tables, sequences, and functions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO springboot;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO springboot;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO springboot;

-- Ensure future tables, sequences, and functions inherit permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO springboot;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO springboot;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO springboot;