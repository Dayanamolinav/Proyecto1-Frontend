import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import BarraNavegacion from './components/BarraNavegacion'

import Inicio from './pages/Inicio'
import Explorar from './pages/Explorar'
import Detalle from './pages/Detalle'
import Favoritos from './pages/Favoritos'
import Contacto from './pages/Contacto'
import NoEncontrada from './pages/NoEncontrada'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <BarraNavegacion />

      <Toaster
        position="top-right"
        toastOptions={{ duration: 3500 }}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/explorar" element={<Explorar />} />

        <Route path="/explorar/:id" element={<Detalle />} />

        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </div>
  )
}