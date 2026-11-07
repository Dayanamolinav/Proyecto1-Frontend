import type { Personaje } from '../types/Personaje'

interface PersonajePotterAPI {
  index: number
  fullName: string
  hogwartsHouse?: string
  interpretedBy?: string
  image?: string
  birthdate?: string
}

const API_PERSONAJES =
  'https://potterapi-fedeperin.vercel.app/es/characters'

function adaptarPersonaje(
  item: PersonajePotterAPI,
): Personaje {
  if (
    !item ||
    typeof item.fullName !== 'string' ||
    !item.fullName.trim() ||
    !Number.isSafeInteger(item.index) ||
    item.index < 0
  ) {
    throw new Error(
      'La API devolvió un personaje con datos inválidos.',
    )
  }

  const nombre = item.fullName.trim()

  return {
    id: `potterapi-${nombre}`,
    apiIndex: item.index,
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
}

export async function obtenerPersonajes(
  signal?: AbortSignal,
): Promise<Personaje[]> {
  const respuesta = await fetch(API_PERSONAJES, { signal })

  if (!respuesta.ok) {
    throw new Error(
      'No fue posible consultar la API de personajes.',
    )
  }

  const datos: unknown = await respuesta.json()

  if (!Array.isArray(datos)) {
    throw new Error(
      'La API devolvió datos en un formato inesperado.',
    )
  }

  return datos.map((item) => adaptarPersonaje(item))
}

async function consultarPorIndice(
  indice: number,
  signal?: AbortSignal,
): Promise<Personaje | null> {
  const respuesta = await fetch(
    `${API_PERSONAJES}?index=${indice}`,
    { signal },
  )

  if (respuesta.status === 404) {
    return null
  }

  if (!respuesta.ok) {
    throw new Error(
      'No fue posible consultar el personaje.',
    )
  }

  const texto = await respuesta.text()

  if (!texto.trim()) {
    return null
  }

  let datos: PersonajePotterAPI

  try {
    datos = JSON.parse(texto)
  } catch {
    throw new Error(
      'La respuesta del personaje no es válida.',
    )
  }

  const personaje = adaptarPersonaje(datos)

  if (personaje.apiIndex !== indice) {
    throw new Error(
      'La API devolvió un personaje inesperado.',
    )
  }

  return personaje
}

async function buscarPorNombre(
  nombre: string,
  signal?: AbortSignal,
): Promise<Personaje | null> {
  const respuesta = await fetch(
    `${API_PERSONAJES}?search=${encodeURIComponent(nombre)}`,
    { signal },
  )

  if (!respuesta.ok) {
    throw new Error(
      'No fue posible buscar el personaje.',
    )
  }

  const datos: PersonajePotterAPI[] =
    await respuesta.json()

  if (!Array.isArray(datos)) {
    throw new Error(
      'La búsqueda devolvió datos inesperados.',
    )
  }

  const coincidencia = datos.find(
    (item) =>
      item &&
      typeof item.fullName === 'string' &&
      item.fullName.trim() === nombre,
  )

  if (!coincidencia) {
    return null
  }

  const candidato = adaptarPersonaje(coincidencia)

  if (candidato.apiIndex === undefined) {
    return null
  }

  const personaje = await consultarPorIndice(
    candidato.apiIndex,
    signal,
  )

  return personaje?.name === nombre
    ? personaje
    : null
}

export async function obtenerPersonajePorId(
  id: string,
  nombreEsperado: string | null,
  signal?: AbortSignal,
): Promise<Personaje | null> {
  if (/^\d+$/.test(id)) {
    const indice = Number(id)

    if (!Number.isSafeInteger(indice)) {
      return null
    }

    const personaje = await consultarPorIndice(
      indice,
      signal,
    )

    if (
      !nombreEsperado ||
      personaje?.name === nombreEsperado
    ) {
      return personaje
    }

    // Si la API cambió el orden, buscamos el nombre original.
    return buscarPorNombre(nombreEsperado, signal)
  }

  // Conserva los enlaces y favoritos guardados con el formato anterior.
  if (id.startsWith('potterapi-')) {
    const nombre = id.slice('potterapi-'.length)

    return buscarPorNombre(nombre, signal)
  }

  return null
}