import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useFavoritos } from '../store/useFavoritos'
import type { Personaje } from '../types/Personaje'

interface BotonFavoritoProps {
  personaje: Personaje
}

export default function BotonFavorito({
  personaje,
}: BotonFavoritoProps) {
  const dialogo = useRef<HTMLDialogElement>(null)

  const esFavorito = useFavoritos((estado) =>
    estado.favoritos.some((item) => item.id === personaje.id),
  )

  const alternarFavorito = useFavoritos(
    (estado) => estado.alternarFavorito,
  )

  function manejarFavorito() {
    if (esFavorito) {
      if (dialogo.current && !dialogo.current.open) {
        dialogo.current.showModal()
      }

      return
    }

    alternarFavorito(personaje)
    toast.success(`${personaje.name} se agregó a favoritos.`)
  }

  function cancelar() {
    dialogo.current?.close()

    toast('El personaje sigue en favoritos.', {
      icon: 'ℹ️',
    })
  }

  function confirmar() {
    dialogo.current?.close()
    alternarFavorito(personaje)
    toast.success(`${personaje.name} se quitó de favoritos.`)
  }

  return (
    <>
      <button
        type="button"
        onClick={manejarFavorito}
        aria-pressed={esFavorito}
        aria-label={`${
          esFavorito ? 'Quitar' : 'Agregar'
        } a ${personaje.name} ${
          esFavorito ? 'de' : 'a'
        } favoritos`}
        className="rounded-lg border border-amber-400 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-slate-700"
      >
        {esFavorito
          ? '★ Quitar de favoritos'
          : '☆ Agregar a favoritos'}
      </button>

      {esFavorito && (
        <dialog
          ref={dialogo}
          aria-label={`Confirmar si quieres quitar a ${personaje.name} de favoritos`}
          onCancel={(evento) => {
            evento.preventDefault()
            cancelar()
          }}
          className="m-auto w-[90%] max-w-md rounded-2xl border border-amber-400/40 bg-slate-900 p-6 text-slate-100 shadow-2xl backdrop:bg-black/70"
        >
          <h2 className="text-xl font-bold text-white">
            ¿Quitar de favoritos?
          </h2>

          <p className="mt-3 text-slate-300">
            ¿Quieres quitar a {personaje.name} de tu lista de favoritos?
          </p>

          {/*
            Patrón oscuro intencional: confirm-shaming.
            El texto de cancelar sugiere que quitar al personaje
            te hace menos fan. Se incluye únicamente como ejemplo
            académico, según el requisito del proyecto.
          */}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={cancelar}
              className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-300"
            >
              No, quiero seguir siendo fan
            </button>

            <button
              type="button"
              onClick={confirmar}
              className="rounded-lg border border-red-400 px-4 py-2 font-semibold text-red-200 hover:bg-red-950"
            >
              Sí, quitar
            </button>
          </div>
        </dialog>
      )}
    </>
  )
}