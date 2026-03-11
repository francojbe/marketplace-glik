"use client"

import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { Product } from "@/types/product"
import React from "react"

export const ProductCard = ({
  product,
  className,
  variant = "grid",
}: {
  product: HttpTypes.StoreProduct | Product,
  className?: string
  variant?: "grid" | "list"
}) => {
  if (!product) return null

  const { cheapestPrice } = getProductPrice({ product: product as HttpTypes.StoreProduct })
  const productName = String(product.title || "Product")
  const isList = variant === "list"

  return (
    <div
      className={cn(
        "group border border-[#e2e8f0] rounded overflow-hidden flex bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer h-full",
        isList ? "flex-row h-[220px]" : "flex-col w-full",
        className
      )}
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Ver ${productName}`}
        title={`Ver ${productName}`}
        className={cn("flex w-full h-full", isList ? "flex-row" : "flex-col")}
      >
        {/* IMAGEN DEL VEHÍCULO */}
        <div className={cn(
          "relative bg-gray-100 overflow-hidden flex-shrink-0 group",
          isList ? "w-1/3 h-full" : "w-full aspect-[4/3]"
        )}>
          {/* Cámara (mock count) */}
          <div className="absolute top-2 left-2 z-10 bg-black/60 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            10
          </div>
          
          {/* Flecha lateral hover */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>

          {/* Dots carousel falso */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 items-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full outline outline-1 outline-offset-1 outline-white bg-transparent"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>
          </div>

          {product.thumbnail ? (
            <Image
              priority
              src={decodeURIComponent(product.thumbnail)}
              alt={`${productName} image`}
              fill
              sizes={isList ? "33vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
               <span className="text-sm font-medium">No Image</span>
            </div>
          )}
        </div>

        {/* CONTENIDO / DATA */}
        <div className={cn(
          "p-4 flex flex-col flex-1",
          isList ? "justify-center" : ""
        )}>
           {/* Top section: Title and subtitle + Heart */}
           <div className="flex justify-between items-start gap-4 mb-3">
             <div className="flex-1">
               <h3 className="text-xl font-medium text-[#333333] leading-tight mb-0.5 tracking-tight truncate">
                 {product.title}
               </h3>
               <p className="text-sm text-gray-500 tracking-wide line-clamp-1">{product.subtitle || 'SR5'}</p>
             </div>
             <button className="text-[#0086c9] hover:bg-blue-50 p-1 rounded-full transition-colors flex-shrink-0" aria-label="Guardar" onClick={(e) => e.preventDefault()}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
             </button>
           </div>
           
           {/* Price area */}
           <div className="flex items-center justify-between mb-4">
             <div className="text-[26px] font-medium text-[#333333] flex items-baseline gap-1.5 tracking-tight">
               {cheapestPrice?.calculated_price || '$16,990,000'} <span className="text-[15px] font-semibold text-gray-500 uppercase tracking-widest relative top-[-1px]">CLP</span>
             </div>
             <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 border border-[#003B5C] rounded bg-[#F4F9FA] text-[#003B5C]">
               Premium 
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
             </div>
           </div>
           
           <hr className="border-t border-gray-100 mb-4" />
           
           {/* Specs grid */}
           <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[14px] text-[#222222] font-medium mb-4">
             <div className="flex items-center gap-2.5">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500/80"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0v1a2 2 0 0 1-4 0v-1m-6 0v1a2 2 0 0 1-4 0v-1m14-5H3"/></svg>
               {product?.options?.find(o => o.title?.toLowerCase() === 'tipo')?.values?.[0]?.value || 'SUV'}
             </div>
             <div className="flex items-center gap-2.5">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500/80"><path d="M3 22v-8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v8M14 22V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v16M22 17v-4.5c0-1.22-.84-2.26-2-2.45V4c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v18M18 10h4"/></svg>
               {product?.options?.find(o => o.title?.toLowerCase() === 'combustible')?.values?.[0]?.value || 'Bencina'}
             </div>
             <div className="flex items-center gap-2.5">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500/80"><path d="M12 9V2M12 22v-7M12 5l-4-3-4 3M12 5l4-3 4 3"/><circle cx="12" cy="12" r="3"/><path d="M14.12 14.12 18 18M9.88 14.12 6 18M14.12 9.88 18 6M9.88 9.88 6 6"/></svg>
               {product?.options?.find(o => o.title?.toLowerCase() === 'transmisión')?.values?.[0]?.value || 'Automática'}
             </div>
             <div className="flex items-center gap-2.5">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500/80"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
               {product?.options?.find(o => o.title?.toLowerCase() === 'estado')?.values?.[0]?.value === 'Nueva' ? '0 km' : '145,000 km'}
             </div>
           </div>
           
           <hr className="border-t border-gray-100 mb-4" />
           
           {/* Seller Info */}
           <div className="mb-5">
             <div className="text-[15px] font-semibold text-[#333333]">Automotora Usado</div>
             <div className="text-[14px] text-[#4a4a4a] flex items-center gap-1.5 mt-1.5 font-medium">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-gray-600"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> 
               Metropolitana de Santiago
             </div>
           </div>
           
           {/* Buttons */}
           <div className={cn(
             "flex gap-3 mt-auto",
             isList ? "w-64" : "w-full"
           )}>
             <button 
                onClick={(e) => { e.preventDefault(); /* Contact Action */ }}
                className="flex-1 py-[11px] px-2 text-[14.5px] font-medium text-[#0086c9] border border-[#0086c9] rounded hover:bg-blue-50 transition-colors bg-white w-full"
             >
               Contactar vendedor
             </button>
             <button 
                className="flex-1 py-[11px] px-2 text-[14.5px] font-medium text-white bg-[#0086c9] border border-[#0086c9] border-t-transparent border-l-transparent border-r-transparent rounded hover:bg-[#0073ae] transition-colors w-full shadow-sm"
             >
               Ver detalles
             </button>
           </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
