"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { Product } from "@/types/product"

export const ProductCard = ({
  product,
  className,
  variant = "grid",
}: {
  product: HttpTypes.StoreProduct | Product,
  className?: string
  variant?: "grid" | "list"
}) => {
  if (!product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({ product: product as HttpTypes.StoreProduct })
  const productName = String(product.title || "Product")

  const isList = variant === "list"

  return (
    <div
      className={cn(
        "group border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex bg-white overflow-hidden cursor-pointer",
        isList ? "flex-row h-[140px]" : "flex-col justify-between w-full h-full",
        className
      )}
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Ver ${productName}`}
        title={`Ver ${productName}`}
        className={cn("block flex flex-1 h-full", isList ? "flex-row" : "flex-col")}
      >
        {/* IMAGEN DEL VEHÍCULO */}
        <div className={cn(
          "relative bg-gray-100 overflow-hidden",
          isList ? "w-48 lg:w-56 h-full flex-shrink-0" : "w-full h-36 lg:h-40"
        )}>
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            <div className="bg-[#00d4aa] text-[#1b103c] text-[7px] lg:text-[8px] font-black px-1.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
              Glik Garantizado
            </div>
          </div>

          {product.thumbnail ? (
            <Image
              priority
              src={decodeURIComponent(product.thumbnail)}
              alt={`${productName} image`}
              fill
              sizes={isList ? "250px" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
               <span className="text-xs">No Image</span>
            </div>
          )}
        </div>

        {/* CONTENIDO / DATA */}
        <div className={cn(
          "p-2 lg:p-3 flex flex-col flex-1 group-hover:bg-gray-50/30 transition-colors duration-300",
          isList ? "justify-between" : "min-h-[160px]"
        )}>
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className={cn(
                "font-bold text-[#1b103c] leading-tight line-clamp-2",
                isList ? "text-sm lg:text-base max-w-[80%]" : "text-xs lg:text-[13px] mb-1 min-h-[34px]"
              )} title={productName}>
                {product.title}
              </h3>
              {isList && (
                <div className="text-red-500 hover:text-red-600 transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
              )}
            </div>

            <div className={cn(
              "flex flex-wrap gap-x-3 gap-y-1 text-[10px] lg:text-[11px] text-gray-500 font-medium mb-1 truncate",
              isList ? "mt-1 opacity-80" : "hidden"
            )}>
               <span className="flex items-center gap-1"><span className="opacity-50 text-base">📅</span> {product?.options?.find(o => o.title?.toLowerCase() === 'año')?.values?.[0]?.value || '2024'}</span>
               <span className="flex items-center gap-1"><span className="opacity-50 text-base">🛣️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'estado')?.values?.[0]?.value === 'Nueva' ? '0 km' : 'Usada'}</span>
               <span className="flex items-center gap-1"><span className="opacity-50 text-base">🏍️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'cilindrada')?.values?.[0]?.value || 'Cilindrada'}</span>
               {isList && <span className="flex items-center gap-1"><span className="opacity-50 text-base">📍</span> Santiago</span>}
            </div>

            {!isList && (
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-1.5 font-bold">
                 <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                 <span>4.8</span>
              </div>
            )}
          </div>

          <div className={cn(
            "flex flex-col mt-auto",
            isList ? "sm:flex-row sm:items-end sm:justify-between sm:gap-4" : ""
          )}>
            <div className="flex items-end gap-1.5 mb-1 sm:mb-0">
               <span className={cn(
                 "font-black tracking-tight text-[#1b103c]",
                 isList ? "text-lg lg:text-xl" : "text-base"
               )}>
                 {cheapestPrice?.calculated_price || 'Precio en tienda'}
               </span>
               {cheapestPrice?.calculated_price !== cheapestPrice?.original_price && (
                 <span className="text-[10px] text-gray-400 line-through mb-1">
                   {cheapestPrice?.original_price}
                 </span>
               )}
            </div>

            <div className={cn(
              "bg-[#ec7b15] text-white rounded-sm hover:bg-[#d66a0e] transition-colors font-bold uppercase text-[9px] lg:text-[10px] tracking-wider shadow-sm flex items-center justify-center sm:w-32 h-8",
              !isList ? "w-full mt-2" : ""
            )}>
               Ver Oferta
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
