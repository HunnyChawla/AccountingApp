-- Create databases
CREATE DATABASE keycloakdb;
CREATE DATABASE springbootdb;

-- Create roles and grant privileges
CREATE USER keycloak WITH ENCRYPTED PASSWORD 'keycloak123';
CREATE USER springboot WITH ENCRYPTED PASSWORD 'springboot123';

GRANT ALL PRIVILEGES ON DATABASE keycloakdb TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE springbootdb TO springboot;