'use client';

import { useState } from 'react';

import { Button } from '@/components/atoms';
import { ColorFilter, ConditionFilter, PriceFilter, SizeFilter } from '@/components/cells';
import { ProductListingActiveFilters } from '@/components/organisms';
import useFilters from '@/hooks/useFilters';
import { CloseIcon } from '@/icons';
import { cn } from '@/lib/utils';

export const ProductSidebar = () => {
  const [filterModal, setFilterModal] = useState(false);
  const { clearAllFilters } = useFilters('');

  return (
    <aside
      className="relative w-full"
      data-testid="sidebar"
    >
      <div
        className={cn(
          'pointer-events-none left-0 top-0 h-full w-full bg-primary blur-sm transition-opacity duration-100 md:relative',
          filterModal ? 'opacity-1 z-20' : '-z-10 opacity-0 md:z-10 md:opacity-100'
        )}
      >
        {filterModal && (
          <div className="md:hidden">
            <div
              className="mb-4 flex items-center justify-between border-y p-4"
              data-testid="sidebar-filter-header"
            >
              <h3 className="heading-md uppercase">Filters</h3>
              <div
                onClick={() => setFilterModal(false)}
                className="cursor-pointer"
                data-testid="sidebar-close-button"
              >
                <CloseIcon size={20} />
              </div>
            </div>
            <div className="mb-4 px-2 md:mb-0">
              <ProductListingActiveFilters />
            </div>
          </div>
        )}

        <div
          className="no-scrollbar h-[calc(100vh-200px)] overflow-y-scroll px-2 md:h-full md:overflow-y-auto md:px-0 bg-white p-6 rounded-lg shadow"
          data-testid="sidebar-filters"
        >
          <h3 className="font-bold text-lg mb-6">Filtros</h3>

          {/* Precio */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Precio</label>
            <input type="range" className="w-full accent-[#003087]" min="1000000" max="20000000" />
            <div className="text-sm text-gray-600 mt-1 flex justify-between">
              <span>$1.000.000</span>
              <span>$20.000.000</span>
            </div>
          </div>

          {/* Año */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Año</label>
            <input type="range" className="w-full accent-[#003087]" min="2018" max="2026" />
            <div className="text-sm text-gray-600 mt-1 flex justify-between">
              <span>2018</span>
              <span>2026</span>
            </div>
          </div>

          {/* Km */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Km</label>
            <input type="range" className="w-full accent-[#003087]" min="0" max="50000" />
            <div className="text-sm text-gray-600 mt-1 flex justify-between">
              <span>0 km</span>
              <span>50,000 km</span>
            </div>
          </div>

          {/* Marcas */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Marcas</label>
            {['Yamaha', 'Honda', 'Suzuki', 'Kawasaki', 'Bajaj', 'Glik Moto'].map(marca => (
              <div key={marca} className="flex items-center mb-2">
                <input type="checkbox" id={`marca-${marca}`} className="mr-2 accent-[#ec7b15] h-4 w-4" />
                <label htmlFor={`marca-${marca}`} className="text-sm text-gray-700">{marca}</label>
              </div>
            ))}
          </div>

          <button className="w-full bg-[#ec7b15] text-white py-2 rounded-lg hover:bg-[#d66a0e] font-bold uppercase transition-all shadow-md">
            Filtrar Motos
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 flex w-full items-center gap-2 border-y bg-primary px-4 py-4 md:hidden"
          data-testid="sidebar-actions"
        >
          <Button
            className="label-sm w-1/2 uppercase"
            variant="tonal"
            onClick={() => clearAllFilters()}
            data-testid="sidebar-clear-all-button"
          >
            Limpiar
          </Button>
          <Button
            className="label-sm w-1/2 uppercase bg-[#ec7b15]"
            onClick={() => setFilterModal(false)}
            data-testid="sidebar-view-listings-button"
          >
            Ver Resultados
          </Button>
        </div>
      </div>
    </aside>
  );
};
