import { DatabaseSync } from 'node:sqlite'
// Vite inlina el contenido del SQL en el bundle: funciona igual en dev y empaquetado
import schema from './schema.sql?raw'

// Abre (o crea) la base de datos y garantiza que el esquema esté aplicado.
// Recibe la ruta por parámetro para poder reutilizarla en pruebas (inyección de dependencias).
export function openDatabase(dbPath) {
  const db = new DatabaseSync(dbPath)
  db.exec('PRAGMA foreign_keys = ON;')
  db.exec('PRAGMA journal_mode = WAL;')
  db.exec(schema)
  return db
}
