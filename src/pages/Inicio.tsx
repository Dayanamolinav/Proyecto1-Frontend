import { Link } from 'react-router'

export default function Inicio() {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
        Bienvenido al mundo mágico
      </p>

      <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
        Descubre los personajes de Harry Potter
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-300">
        Explora personajes, conoce sus casas y descubre quiénes
        forman parte de este universo.
      </p>

      <Link
        to="/explorar"
        className="mt-8 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
      >
        Explorar personajes
      </Link>
    </main>
  )
}