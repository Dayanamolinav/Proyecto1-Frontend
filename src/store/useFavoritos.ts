import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Personaje } from '../types/Personaje'

interface EstadoFavoritos {
  favoritos: Personaje[]
  alternarFavorito: (personaje: Personaje) => void
}

export const useFavoritos = create<EstadoFavoritos>()(
  persist(
    (set) => ({
      favoritos: [],

      alternarFavorito: (personaje) =>
        set((estado) => ({
          favoritos: estado.favoritos.some(
            (item) => item.id === personaje.id,
          )
            ? estado.favoritos.filter(
                (item) => item.id !== personaje.id,
              )
            : [...estado.favoritos, personaje],
        })),
    }),
    {
      name: 'favoritos-harry-potter',
    },
  ),
)