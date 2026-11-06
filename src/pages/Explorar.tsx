import { useEffect, useState } from 'react'

import TarjetaPersonaje from '../components/TarjetaPersonaje'
import { obtenerPersonajes } from '../services/personajes'

import type { Personaje } from '../types/Personaje'

export default function Explorar() {
  const [personajes, setPersonajes] = useState<Personaje[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [busqueda, setBusqueda] = useState('')
  const [casa, setCasa] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarPersonajes() {
      setCargando(true)
      setError('')

      try {
        const datos = await obtenerPersonajes(controlador.signal)

        if (!controlador.signal.aborted) {
          setPersonajes(datos)
        }
      } catch {
        if (!controlador.signal.aborted) {
          setError(
            'No pudimos cargar los personajes. Revisa tu conexión o inténtalo más tarde.',
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarPersonajes()

    return () => controlador.abort()
  }, [intento])

  const casas = Array.from(
    new Set(
      personajes
        .map((personaje) => personaje.house)
        .filter(Boolean),
    ),
  ).sort()

  const palabras = busqueda
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  const filtrados = personajes.filter((personaje) => {
    const nombre = personaje.name.toLowerCase()

    const coincideNombre = palabras.every((palabra) =>
      nombre.includes(palabra),
    )

    const coincideCasa =
      casa === '' || personaje.house === casa

    return coincideNombre && coincideCasa
  })

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">
        Explorar personajes
      </h1>

      <p className="mt-2 text-slate-300">
        Busca por nombre o selecciona una casa.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="busqueda"
            className="mb-2 block text-sm font-medium"
          >
            Nombre
          </label>

          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
            placeholder="Ejemplo: Harry Potter"
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="casa"
            className="mb-2 block text-sm font-medium"
          >
            Casa
          </label>

          <select
            id="casa"
            value={casa}
            onChange={(evento) =>
              setCasa(evento.target.value)
            }
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="">Todas las casas</option>

            {casas.map((nombreCasa) => (
              <option
                key={nombreCasa}
                value={nombreCasa}
              >
                {nombreCasa}
              </option>
            ))}
          </select>
        </div>
      </div>

      {cargando && (
        <p
          role="status"
          className="mt-8 text-slate-300"
        >
          Cargando personajes...
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-red-400 bg-red-950 p-5 text-red-100"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              setIntento((valor) => valor + 1)
            }
            className="mt-4 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <p
            aria-live="polite"
            className="mt-8 text-sm text-slate-300"
          >
            Mostrando {filtrados.length} de{' '}
            {personajes.length} personajes
          </p>

          {filtrados.length === 0 ? (
            <p className="mt-8 text-slate-300">
              No encontramos personajes con esos filtros.
            </p>
          ) : (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((personaje) => (
                <TarjetaPersonaje
                  key={personaje.id}
                  personaje={personaje}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}