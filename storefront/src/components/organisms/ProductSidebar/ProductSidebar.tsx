'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms';
import { CloseIcon, FilterIcon } from '@/icons'; // Assuming FilterIcon exists
import { cn } from '@/lib/utils';
import {
  CILINDRADA_OPTIONS,
  CONDICION_OPTIONS,
  MARCA_OPTIONS,
  YEAR_RANGE
} from '@/lib/constants/moto-data';

export const ProductSidebar = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState({ min: YEAR_RANGE.min, max: YEAR_RANGE.max });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="w-full">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">Motos</h2>
        <Button
          onClick={() => setFilterModal(true)}
          className="flex items-center gap-2 bg-[#1b103c] text-white px-6 py-2 rounded-full"
        >
          <span>FILTRAR</span>
        </Button>
      </div>

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-0 z-[60] bg-white transition-transform duration-300 md:relative md:translate-x-0 md:bg-transparent md:z-10",
          filterModal ? "translate-x-0" : "-translate-x-full md:block"
        )}
      >
        <div className="h-full flex flex-col p-6 md:p-0 md:bg-white md:p-6 md:rounded-2xl md:shadow-lg md:border md:border-gray-100 overflow-y-auto no-scrollbar">
          {/* Header Mobile */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h3 className="text-2xl font-black uppercase italic">Filtros</h3>
            <button onClick={() => setFilterModal(false)} className="p-2 bg-gray-100 rounded-full">
              <CloseIcon size={24} />
            </button>
          </div>

          <h3 className="hidden md:block text-lg font-black uppercase italic border-b-4 border-[#ec7b15] pb-2 mb-8 w-fit">
            Filtrar Moto
          </h3>

          {/* Condition Filter */}
          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#1b103c] mb-5">Estado</h4>
            <div className="grid grid-cols-2 gap-2">
              {CONDICION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className="py-2 text-xs font-bold border-2 rounded-lg transition-all hover:bg-gray-50 border-gray-100 text-gray-400 group active:scale-95"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#1b103c] mb-5">Marcas</h4>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {MARCA_OPTIONS.map(brand => (
                <label key={brand} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 appearance-none rounded border-2 border-gray-200 checked:bg-[#ec7b15] checked:border-[#ec7b15] transition-all"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-[#ec7b15] transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cilindrada Filter */}
          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#1b103c] mb-5">Cilindrada</h4>
            <div className="flex flex-wrap gap-2">
              {CILINDRADA_OPTIONS.map(opt => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" name="cilindrada" className="hidden peer" />
                  <span className="px-3 py-2 text-[11px] font-bold border-2 border-gray-100 rounded-lg text-gray-500 peer-checked:border-[#ec7b15] peer-checked:text-[#ec7b15] peer-checked:bg-orange-50 transition-all block">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Year Range Filter */}
          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#1b103c] mb-5">Año</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 mb-1 font-bold">DESDE</p>
                  <input
                    type="number"
                    defaultValue={YEAR_RANGE.min}
                    className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#ec7b15]"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400 mb-1 font-bold">HASTA</p>
                  <input
                    type="number"
                    defaultValue={YEAR_RANGE.max}
                    className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#ec7b15]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-6 border-t border-gray-100 md:border-none">
            <button className="w-full bg-[#ec7b15] text-white py-4 rounded-xl font-black uppercase text-sm tracking-[2px] shadow-[0_5px_15px_rgba(236,123,21,0.3)] hover:translate-y-[-2px] transition-all overflow-hidden relative group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                VER RESULTADOS
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button
              onClick={() => setSelectedBrands([])}
              className="w-full mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
            >
              Borrar Filtros
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {filterModal && (
        <div
          className="fixed inset-0 bg-[#1b103c]/40 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setFilterModal(false)}
        ></div>
      )}
    </div>
  );
};
