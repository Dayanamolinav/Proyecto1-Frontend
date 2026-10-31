import { Link } from 'react-router'
import TarjetaPersonaje from '../components/TarjetaPersonaje'
import { useFavoritos } from '../store/useFavoritos'

export default function Favoritos() {
  const favoritos = useFavoritos((estado) => estado.favoritos)

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">
        Mis favoritos
      </h1>

      <p className="mt-2 text-slate-300">
        Personajes guardados: {favoritos.length}
      </p>

      {favoritos.length === 0 ? (
        <section className="mt-12 rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center">
          <p className="text-slate-200">
            Todavía no tienes personajes favoritos.
          </p>

          <Link
            to="/explorar"
            className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-300"
          >
            Explorar personajes
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoritos.map((personaje) => (
            <TarjetaPersonaje
              key={personaje.id}
              personaje={personaje}
            />
          ))}
        </div>
      )}
    </main>
  )
}