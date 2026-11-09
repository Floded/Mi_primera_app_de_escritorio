-- Esquema PROVISIONAL: los campos finales del material se definirán con el usuario.
-- Se ejecuta de forma idempotente en cada arranque.
CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
