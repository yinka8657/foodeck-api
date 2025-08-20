// db.js
require('dotenv').config();
const Database = require('better-sqlite3');

// Open or create database file
const dbFile = process.env.DB_FILE || 'foodeck.db';
const db = new Database(dbFile);

// Create tables if they don't exist
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    image TEXT,
    description TEXT,
    value TEXT,
    expiry TEXT
);

CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    description TEXT,           -- new short description column
    value TEXT,                -- for recipe.value (e.g. Protein, Carbohydrate)
    time TEXT,                 -- for recipe.time (e.g. 45-60 mins)
    image_url TEXT,
    instructions TEXT,         -- for recipe.instructions (detailed instructions)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, ingredient_id)
);
`);

// Export the database connection
module.exports = db;
