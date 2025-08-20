const db = require('./db');


function migrateRecipes() {
    try {
      db.exec(`ALTER TABLE recipes ADD COLUMN value TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    try {
      db.exec(`ALTER TABLE recipes ADD COLUMN time TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    try {
      db.exec(`ALTER TABLE recipes ADD COLUMN instructions TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    console.log("Recipes table migration complete");
  }

  migrateRecipes();
  