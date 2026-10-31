import { Link } from 'react-router'

export default function NoEncontrada() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-amber-400">
        404
      </h1>

      <p className="mt-4">
        No encontramos esta página.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block text-amber-400 underline"
      >
        Volver al inicio
      </Link>
    </main>
  )
}