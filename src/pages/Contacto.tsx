import { useState } from 'react'
import type { FormEvent } from 'react'
import toast from 'react-hot-toast'

type Campo = 'nombre' | 'correo' | 'mensaje'

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [tocados, setTocados] = useState({
    nombre: false,
    correo: false,
    mensaje: false,
  })

  const [enviado, setEnviado] = useState(false)

  const errores = {
    nombre:
      formulario.nombre.trim().length >= 2
        ? ''
        : 'El nombre debe tener al menos 2 caracteres.',

    correo:
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formulario.correo.trim(),
      )
        ? ''
        : 'Ingresa un correo válido.',

    mensaje:
      formulario.mensaje.trim().length >= 10
        ? ''
        : 'El mensaje debe tener al menos 10 caracteres.',
  }

  const esValido =
    !errores.nombre && !errores.correo && !errores.mensaje

  function cambiar(campo: Campo, valor: string) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }))

    setEnviado(false)
  }

  function marcar(campo: Campo) {
    setTocados((actual) => ({
      ...actual,
      [campo]: true,
    }))

    if (
      campo === 'correo' &&
      formulario.correo.trim() &&
      errores.correo
    ) {
      toast.error(errores.correo)
    }
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (!esValido) {
      toast.error('Revisa los campos antes de continuar.')
      return
    }

    setEnviado(true)
    toast.success('Datos validados. No se envió un correo.')
  }

  const estiloCampo =
    'mt-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white'

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-bold text-white">
        Contacto
      </h1>

      <p className="mt-3 text-slate-300">
        ¿Tienes una pregunta o sugerencia? Escribe tu mensaje.
      </p>

      <p className="mt-2 text-sm text-slate-400">
        Este formulario es una demostración: valida los datos y no envía correos.
      </p>

      <form
        onSubmit={manejarEnvio}
        noValidate
        className="mt-8 space-y-5 rounded-2xl border border-slate-700 bg-slate-800 p-6"
      >
        <div>
          <label htmlFor="nombre" className="block font-medium">
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            autoComplete="name"
            value={formulario.nombre}
            onChange={(evento) =>
              cambiar('nombre', evento.target.value)
            }
            onBlur={() => marcar('nombre')}
            aria-invalid={tocados.nombre && Boolean(errores.nombre)}
            aria-describedby={
              tocados.nombre && errores.nombre
                ? 'error-nombre'
                : undefined
            }
            className={estiloCampo}
            placeholder="Tu nombre"
          />

          {tocados.nombre && errores.nombre && (
            <p id="error-nombre" className="mt-2 text-sm text-red-300">
              {errores.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="correo" className="block font-medium">
            Correo electrónico
          </label>

          <input
            id="correo"
            type="email"
            autoComplete="email"
            value={formulario.correo}
            onChange={(evento) =>
              cambiar('correo', evento.target.value)
            }
            onBlur={() => marcar('correo')}
            aria-invalid={tocados.correo && Boolean(errores.correo)}
            aria-describedby={
              tocados.correo && errores.correo
                ? 'error-correo'
                : undefined
            }
            className={estiloCampo}
            placeholder="nombre@ejemplo.com"
          />

          {tocados.correo && errores.correo && (
            <p id="error-correo" className="mt-2 text-sm text-red-300">
              {errores.correo}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mensaje" className="block font-medium">
            Mensaje
          </label>

          <textarea
            id="mensaje"
            rows={5}
            value={formulario.mensaje}
            onChange={(evento) =>
              cambiar('mensaje', evento.target.value)
            }
            onBlur={() => marcar('mensaje')}
            aria-invalid={tocados.mensaje && Boolean(errores.mensaje)}
            aria-describedby={
              tocados.mensaje && errores.mensaje
                ? 'error-mensaje'
                : undefined
            }
            className={estiloCampo}
            placeholder="Escribe tu mensaje"
          />

          {tocados.mensaje && errores.mensaje && (
            <p id="error-mensaje" className="mt-2 text-sm text-red-300">
              {errores.mensaje}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!esValido}
          className="w-full rounded-lg bg-amber-400 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enviar mensaje
        </button>

        {enviado && (
          <p role="status" className="text-sm text-emerald-300">
            Datos validados. Esta demostración no envió un correo.
          </p>
        )}
      </form>
    </main>
  )
}