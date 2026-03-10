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
        "group border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between w-full bg-white overflow-hidden",
        className
      )}
      data-testid="product-card"
      data-product-handle={product.handle}
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Ver ${productName}`}
        title={`Ver ${productName}`}
        className="block"
      >
        <div className="relative w-full h-64 bg-gray-100">
          {product.thumbnail ? (
            <Image
              priority
              fetchPriority="high"
              src={decodeURIComponent(product.thumbnail)}
              alt={`${productName} image`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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

        <div className="p-4 flex flex-col">
          <h3 className="font-bold text-xl mb-2 text-gray-900 truncate" title={productName}>
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-[#003087]">
              {cheapestPrice?.calculated_price || 'Precio en tienda'}
            </span>
            {cheapestPrice?.calculated_price !== cheapestPrice?.original_price && (
              <span className="text-sm text-gray-500 line-through">
                {cheapestPrice?.original_price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-md">
            <span>📅 {product?.options?.find(o => o.title?.toLowerCase() === 'año')?.values?.[0]?.value || '2024'}</span>
            <span>🛣️ {product?.options?.find(o => o.title?.toLowerCase() === 'estado' || o.title?.toLowerCase() === 'kilometraje')?.values?.[0]?.value === 'Nueva' ? '0 km' : 'Usada'}</span>
            <span>🏍️ {product?.options?.find(o => o.title?.toLowerCase() === 'cilindrada')?.values?.[0]?.value || 'Motor'}</span>
            <span className="truncate">🏷️ {product?.options?.find(o => o.title?.toLowerCase() === 'marca')?.values?.[0]?.value || 'Glik Moto'}</span>
          </div>

          <button className="w-full bg-[#003087] text-white py-2.5 rounded hover:bg-[#00286b] transition-colors font-semibold uppercase text-sm">
            Ver Moto
          </button>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
