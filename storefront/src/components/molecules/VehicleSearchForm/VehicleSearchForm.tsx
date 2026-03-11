"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export const VehicleSearchForm = () => {
  const router = useRouter()
  const [tipo, setTipo] = useState("Nuevo / usado")
  const [marca, setMarca] = useState("")
  const [modelo, setModelo] = useState("")
  const [keyword, setKeyword] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (tipo && tipo !== "Nuevo / usado") params.append("tipo", tipo)
    if (marca) params.append("marca", marca)
    if (modelo) params.append("modelo", modelo)
    if (keyword) params.append("query", keyword)
    
    router.push(`/categories?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden animate-[fade-in-up_1.2s_ease-out]">
      <form onSubmit={handleSearch} className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          {/* Tipo */}
          <div className="flex flex-col gap-1 w-full text-left">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</label>
            <select
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087] transition-all appearance-none cursor-pointer"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Nuevo / usado">Nuevo / usado</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>

          {/* Marca */}
          <div className="flex flex-col gap-1 w-full text-left">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Marca</label>
            <select
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087] transition-all appearance-none cursor-pointer"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Suzuki">Suzuki</option>
              <option value="BMW">BMW</option>
              <option value="Ducati">Ducati</option>
              <option value="KTM">KTM</option>
              <option value="Triumph">Triumph</option>
            </select>
          </div>

          {/* Modelo */}
          <div className="flex flex-col gap-1 w-full text-left">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modelo</label>
            <select
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087] transition-all appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              disabled={!marca}
            >
              <option value="">Todos los modelos</option>
              {/* This would normally be populated based on the selected brand */}
              {marca && <option value="Model X">Modelo de ejemplo</option>}
            </select>
          </div>

          {/* Palabra clave */}
          <div className="flex flex-col gap-1 w-full lg:col-span-1 text-left">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Palabra clave</label>
            <input
              type="text"
              placeholder="Escribe palabra clave"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087] transition-all"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Boton Buscar */}
          <div className="flex flex-col gap-1 w-full lg:col-span-1 text-left">
            <button
              type="submit"
              className="w-full h-12 bg-[#0073e6] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors text-sm lg:text-base flex items-center justify-center gap-2"
            >
              Buscar vehículos
            </button>
          </div>
        </div>

        {/* Extra Filters (Bottom row) */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-start text-xs font-medium text-gray-600">
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Categoría vehículo <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Región <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Precio min <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Precio max <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Año min <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#0073e6] transition-colors">
            Año max <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </form>
    </div>
  )
}
