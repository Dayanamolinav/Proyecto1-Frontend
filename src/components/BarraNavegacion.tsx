import { Link, NavLink } from 'react-router'
import { useFavoritos } from '../store/useFavoritos'

export default function BarraNavegacion() {
  const totalFavoritos = useFavoritos(
    (estado) => estado.favoritos.length,
  )

  return (
    <header className="border-b border-amber-400/20 bg-slate-900">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
      >
        <Link to="/" className="text-lg font-bold text-amber-400">
          ✦ Mundo Mágico
        </Link>

        <div className="flex flex-wrap gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/explorar"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Explorar
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Favoritos ({totalFavoritos})
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            Contacto
          </NavLink>
        </div>
      </nav>
    </header>
  )
}