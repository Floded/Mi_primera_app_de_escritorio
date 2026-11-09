# Inventario de Mantenimiento Tecnológico

Aplicación de escritorio (Electron + React + SQLite local) para controlar el inventario de materiales de mantenimiento tecnológico. Toda la información se guarda en un archivo SQLite local, sin servidor ni nube.

## Stack

- Electron 45 (Node 24 embebido, con `node:sqlite` nativo)
- React 19 + Tailwind CSS 4
- Persistencia: `node:sqlite` (archivo local `inventory.db`)
- Pruebas: Vitest

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # iniciar la app en modo desarrollo
npm test           # ejecutar pruebas (vitest run)
npm run build      # compilar la app
```

## Estructura

```
├── src/
│   ├── main/        # Proceso principal: ventana, IPC y base de datos
│   ├── preload/     # Puente seguro renderer <-> main (contextBridge)
│   └── renderer/    # Interfaz React + Tailwind
├── tests/           # Pruebas unitarias y de integración (Vitest)
└── electron.vite.config.mjs
```

## Fases del proyecto

1. [x] Fase 1 — Setup, estructura y persistencia local (SQLite)
2. [ ] Fase 2 — CRUD de materiales
3. [ ] Fase 3 — Búsqueda y filtros
4. [ ] Fase 4 — Reportes y respaldo
5. [ ] Fase 5 — Pruebas E2E y empaquetado
