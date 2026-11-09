import { describe, expect, it } from 'vitest'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { openDatabase } from '../../src/main/database/connection.js'

describe('openDatabase', () => {
  it('applies the schema and allows inserting a material', () => {
    const db = openDatabase(':memory:')

    db.prepare(
      'INSERT INTO materials (code, name) VALUES (?, ?)'
    ).run('MT-001', 'Cable HDMI 2m')

    const row = db.prepare('SELECT code, name FROM materials').get()

    expect(row.code).toBe('MT-001')
    expect(row.name).toBe('Cable HDMI 2m')

    db.close()
  })

  it('is idempotent: reopening the same file does not fail', async () => {
    const tmpDir = await mkdtemp(path.join(tmpdir(), 'inv-test-'))
    const dbPath = path.join(tmpDir, 'inventory.db')

    // Primera apertura crea las tablas
    const db1 = openDatabase(dbPath)
    db1.close()

    // Segunda apertura re-ejecuta el esquema (CREATE IF NOT EXISTS) sin errores
    const db2 = openDatabase(dbPath)
    const tables = db2.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='materials'"
    ).get()

    expect(tables.name).toBe('materials')
    db2.close()
  })
})
