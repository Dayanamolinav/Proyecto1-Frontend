export interface Personaje {
  id: string
  name: string
  house: string
  species: string
  image: string
  actor?: string
  dateOfBirth?: string | null
  patronus?: string
  alive?: boolean | null
}