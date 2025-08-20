function migrate() {
    try {
      db.exec(`ALTER TABLE ingredients ADD COLUMN image TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    try {
      db.exec(`ALTER TABLE ingredients ADD COLUMN description TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    try {
      db.exec(`ALTER TABLE ingredients ADD COLUMN value TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    try {
      db.exec(`ALTER TABLE ingredients ADD COLUMN expiry TEXT;`);
    } catch (e) {
      if (!e.message.includes("duplicate column name")) throw e;
    }
    console.log("Ingredients table migration complete");
  }
  