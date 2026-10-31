import { useState } from 'react'
import { Link } from 'react-router'
import BotonFavorito from './BotonFavorito'
import type { Personaje } from '../types/Personaje'

interface TarjetaPersonajeProps {
  personaje: Personaje
  mostrarDetalle?: boolean
}

export default function TarjetaPersonaje({
  personaje,
  mostrarDetalle = true,
}: TarjetaPersonajeProps) {
  const [imagenFallida, setImagenFallida] = useState(false)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg">
      {personaje.image && !imagenFallida ? (
        <img
          src={personaje.image}
          alt={`Imagen de ${personaje.name}`}
          loading="lazy"
          onError={() => setImagenFallida(true)}
          className="h-64 w-full bg-slate-700 object-contain"
        />
      ) : (
        <div className="flex h-64 items-center justify-center bg-slate-700 text-sm text-slate-200">
          Imagen no disponible
        </div>
      )}

      <div className="p-5">
        <h2 className="text-lg font-bold text-white">
          {personaje.name}
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Casa: {personaje.house || 'No especificada'}
        </p>

        <p className="mt-1 text-sm text-slate-300">
          Especie: {personaje.species || 'No especificada'}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {mostrarDetalle && (
            <Link
              to={`/explorar/${personaje.id}`}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              Ver detalle
            </Link>
          )}

          <BotonFavorito personaje={personaje} />
        </div>
      </div>
    </article>
  )
}