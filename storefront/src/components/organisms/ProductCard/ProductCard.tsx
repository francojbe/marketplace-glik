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
}: {
  product: HttpTypes.StoreProduct | Product,
  className?: string
}) => {
  if (!product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({ product: product as HttpTypes.StoreProduct })

  const productName = String(product.title || "Product")

  return (
    <div
      className={cn(
        "group border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:border-[#00d4aa]/50 transition-all duration-300 flex flex-col justify-between w-full bg-white overflow-hidden cursor-pointer",
        className
      )}
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Ver ${productName}`}
        title={`Ver ${productName}`}
        className="block h-full flex flex-col"
      >
        <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <div className="bg-[#00d4aa] text-[#1b103c] text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Glik Garantizado
            </div>
            {product?.options?.find(o => o.title?.toLowerCase() === 'estado')?.values?.[0]?.value === 'Nueva' && (
              <div className="bg-[#ec7b15] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider w-fit">
                Nueva
              </div>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10 bg-white/50 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-md group/heart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 fill-none group-hover/heart:fill-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>

          {product.thumbnail ? (
            <Image
              priority
              fetchPriority="high"
              src={decodeURIComponent(product.thumbnail)}
              alt={`${productName} image`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Image
              priority
              fetchPriority="high"
              src="/images/placeholder.svg"
              alt={`${productName} image placeholder`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 group-hover:bg-gray-50/50 transition-colors duration-300">
          <h3 className="font-bold text-base leading-snug mb-1 text-[#1b103c] line-clamp-2 min-h-[40px]" title={productName}>
            {product.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-bold text-gray-500">
            <div className="flex text-yellow-500">
              {"★".repeat(5)}
            </div>
            <span>4.8</span>
            <span className="opacity-60">({(product.title?.length || 0) * 7 % 150 + 50} reviews)</span>
          </div>

          <div className="flex items-end gap-2 mb-3">
            <span className="text-xl font-black tracking-tight text-[#1b103c]">
              {cheapestPrice?.calculated_price || 'Precio en tienda'}
            </span>
            {cheapestPrice?.calculated_price !== cheapestPrice?.original_price && (
              <span className="text-xs text-gray-400 line-through mb-1">
                {cheapestPrice?.original_price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 mb-4 bg-gray-50/80 p-2.5 rounded-lg border border-gray-100 mt-auto">
            <span className="flex items-center gap-1.5"><span className="text-[13px]">📅</span> {product?.options?.find(o => o.title?.toLowerCase() === 'año')?.values?.[0]?.value || '2024'}</span>
            <span className="flex items-center gap-1.5"><span className="text-[13px]">🛣️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'estado' || o.title?.toLowerCase() === 'kilometraje')?.values?.[0]?.value === 'Nueva' ? '0 km' : 'Usada'}</span>
            <span className="flex items-center gap-1.5"><span className="text-[13px]">🏍️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'cilindrada')?.values?.[0]?.value || 'Motor'}</span>
            <span className="flex items-center gap-1.5 truncate"><span className="text-[13px]">🏷️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'marca')?.values?.[0]?.value || 'Glik Moto'}</span>
          </div>

          <div className="w-full flex items-center justify-center bg-[#ec7b15] text-white py-2.5 rounded-lg hover:bg-[#d66a0e] transition-colors font-bold uppercase text-xs tracking-wider shadow-sm hover:shadow-md min-h-[40px]">
            Ver Detalles
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
