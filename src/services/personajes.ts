import type { Personaje } from '../types/Personaje'

interface PersonajePotterAPI {
  fullName: string
  hogwartsHouse?: string
  interpretedBy?: string
  image?: string
  birthdate?: string
}

const API_PERSONAJES =
  'https://potterapi-fedeperin.vercel.app/es/characters'

export async function obtenerPersonajes(
  signal?: AbortSignal,
): Promise<Personaje[]> {
  const respuesta = await fetch(API_PERSONAJES, { signal })

  if (!respuesta.ok) {
    throw new Error('No fue posible consultar la API de personajes.')
  }

  const datos: PersonajePotterAPI[] = await respuesta.json()

  if (
    !Array.isArray(datos) ||
    datos.some(
      (item) =>
        !item ||
        typeof item.fullName !== 'string' ||
        !item.fullName.trim(),
    )
  ) {
    throw new Error('La API devolvió datos en un formato inesperado.')
  }

  return datos.map((item) => {
    const nombre = item.fullName.trim()

    return {
      id: `potterapi-${nombre}`,
      name: nombre,

      house:
        typeof item.hogwartsHouse === 'string'
          ? item.hogwartsHouse
          : '',

      species: '',

      image:
        typeof item.image === 'string'
          ? item.image
          : '',

      actor:
        typeof item.interpretedBy === 'string'
          ? item.interpretedBy
          : '',

      dateOfBirth:
        typeof item.birthdate === 'string'
          ? item.birthdate
          : '',
    }
  })
}