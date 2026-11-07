import { useEffect, useState } from 'react'

import {
  Link,
  useParams,
  useSearchParams,
} from 'react-router'

import TarjetaPersonaje from '../components/TarjetaPersonaje'
import { obtenerPersonajePorId } from '../services/personajes'

import type { Personaje } from '../types/Personaje'

export default function Detalle() {
  const { id } = useParams<{ id: string }>()

  const [parametros] = useSearchParams()
  const nombreEsperado = parametros.get('nombre')

  const [personaje, setPersonaje] =
    useState<Personaje | null>(null)

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarDetalle() {
      setCargando(true)
      setError('')
      setPersonaje(null)

      try {
        if (!id) {
          throw new Error(
            'No se indicó un personaje.',
          )
        }

        const encontrado = await obtenerPersonajePorId(
          id,
          nombreEsperado,
          controlador.signal,
        )

        if (!encontrado) {
          throw new Error(
            'No encontramos este personaje.',
          )
        }

        if (!controlador.signal.aborted) {
          setPersonaje(encontrado)
        }
      } catch (fallo) {
        if (!controlador.signal.aborted) {
          setError(
            fallo instanceof Error
              ? fallo.message
              : 'Ocurrió un error inesperado.',
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarDetalle()

    return () => controlador.abort()
  }, [id, nombreEsperado, intento])

  if (cargando) {
    return (
      <main
        role="status"
        className="mx-auto max-w-6xl px-6 py-12"
      >
        Cargando personaje...
      </main>
    )
  }

  if (error || !personaje) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <p
          role="alert"
          className="text-red-300"
        >
          {error || 'No se encontró el personaje.'}
        </p>

        <button
          type="button"
          onClick={() =>
            setIntento((valor) => valor + 1)
          }
          className="mt-5 mr-4 rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-950"
        >
          Reintentar
        </button>

        <Link
          to="/explorar"
          className="text-amber-400 underline"
        >
          Volver a explorar
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/explorar"
        className="text-amber-400 underline"
      >
        ← Volver a explorar
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-white">
        {personaje.name}
      </h1>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,320px)_1fr]">
        <TarjetaPersonaje
          personaje={personaje}
          mostrarDetalle={false}
        />

        <section className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
          <h2 className="text-xl font-bold text-white">
            Información del personaje
          </h2>

          <div className="mt-5 space-y-3 text-slate-300">
            <p>
              Casa:{' '}
              {personaje.house || 'No especificada'}
            </p>

            <p>
              Actor o actriz:{' '}
              {personaje.actor || 'No especificado'}
            </p>

            <p>
              Fecha de nacimiento:{' '}
              {personaje.dateOfBirth || 'No especificada'}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}