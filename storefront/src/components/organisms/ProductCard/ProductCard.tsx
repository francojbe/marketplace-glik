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
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
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
          {product.thumbnail ? (
            <Image
              priority
              fetchPriority="high"
              src={decodeURIComponent(product.thumbnail)}
              alt={`${productName} image`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover w-full h-full xl:transition-transform xl:duration-500 xl:group-hover:scale-110"
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

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg leading-tight mb-2 text-[#1b103c] line-clamp-2 min-h-[44px]" title={productName}>
            {product.title}
          </h3>

          <div className="flex items-end gap-2 mb-4">
            <span className="text-2xl font-black tracking-tight text-[#1b103c]">
              {cheapestPrice?.calculated_price || 'Precio en tienda'}
            </span>
            {cheapestPrice?.calculated_price !== cheapestPrice?.original_price && (
              <span className="text-sm text-gray-400 line-through mb-1">
                {cheapestPrice?.original_price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-6 bg-gray-50/80 p-3 rounded-lg border border-gray-100 mt-auto">
            <span className="flex items-center gap-1.5"><span className="text-base">📅</span> {product?.options?.find(o => o.title?.toLowerCase() === 'año')?.values?.[0]?.value || '2024'}</span>
            <span className="flex items-center gap-1.5"><span className="text-base">🛣️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'estado' || o.title?.toLowerCase() === 'kilometraje')?.values?.[0]?.value === 'Nueva' ? '0 km' : 'Usada'}</span>
            <span className="flex items-center gap-1.5"><span className="text-base">🏍️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'cilindrada')?.values?.[0]?.value || 'Motor'}</span>
            <span className="flex items-center gap-1.5 truncate"><span className="text-base">🏷️</span> {product?.options?.find(o => o.title?.toLowerCase() === 'marca')?.values?.[0]?.value || 'Glik Moto'}</span>
          </div>

          <button className="w-full bg-[#ec7b15] text-white py-3 rounded-lg hover:bg-[#d66a0e] transition-colors font-bold uppercase text-sm tracking-wider shadow-md hover:shadow-lg min-h-[48px]">
            Ver Detalles
          </button>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
