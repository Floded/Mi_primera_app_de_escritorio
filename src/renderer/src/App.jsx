import { useEffect, useState } from 'react'

export default function App() {
  const [status, setStatus] = useState('conectando...')

  // Verificación vertical del puente IPC (main <-> renderer)
  useEffect(() => {
    window.api.ping().then(() => setStatus('IPC operativo'))
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-900 text-slate-100">
      <h1 className="text-3xl font-bold tracking-tight">
        Inventario de Mantenimiento Tecnológico
      </h1>
      <p className="max-w-md text-center text-slate-400">
        Fase 1 — Estructura base, persistencia local (SQLite) y comunicación IPC
      </p>
      <span className="rounded-md border border-emerald-600/40 bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-400">
        {status}
      </span>
    </div>
  )
}
