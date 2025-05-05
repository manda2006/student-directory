-- Créer la base de données
CREATE DATABASE IF NOT EXISTS annuaire_db;
USE annuaire_db;

-- Créer l'utilisateur admin avec mot de passe
CREATE USER IF NOT EXISTS 'annuaire_user'@'%' IDENTIFIED BY 'admin';

-- Donner les droits à l'utilisateur sur la base
GRANT ALL PRIVILEGES ON annuaire_db.* TO 'annuaire_user'@'%';
FLUSH PRIVILEGES;

-- Créer la table students (optionnel si vous utilisez Flask-Migrate, mais utile si vous voulez une base initiale prête)
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    sex VARCHAR(10),
    class_name VARCHAR(100)
);
