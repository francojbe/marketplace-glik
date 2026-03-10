"use client"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { ProductVariants } from "@/components/molecules"
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { Chat } from "@/components/organisms/Chat/Chat"
import { SellerProps } from "@/types/seller"
import { WishlistButton } from "../WishlistButton/WishlistButton"
import { Wishlist } from "@/types/wishlist"
import { toast } from "@/lib/helpers/toast"
import { useCartContext } from "@/components/providers"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue
    ) => {
      acc[varopt.option?.title?.toLowerCase() || ""] = varopt.value

      return acc
    },
    {}
  )
}

export const ProductDetailsHeader = ({
  product,
  locale,
  user,
  wishlist,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
  user: HttpTypes.StoreCustomer | null
  wishlist?: Wishlist
}) => {
  const { addToCart, onAddToCart, cart, isAddingItem } = useCartContext()
  const { allSearchParams } = useGetAllSearchParams()

  const { cheapestVariant, cheapestPrice } = getProductPrice({
    product,
  })

  // Check if product has any valid prices in current region
  const hasAnyPrice = cheapestPrice !== null && cheapestVariant !== null

  // set default variant
  const selectedVariant = hasAnyPrice
    ? {
      ...optionsAsKeymap(cheapestVariant.options ?? null),
      ...allSearchParams,
    }
    : allSearchParams

  // get selected variant id
  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.every((option: any) =>
        selectedVariant[option.option?.title?.toLowerCase() || ""]?.includes(
          option.value
        )
      )
    )?.id || ""

  // get variant price
  const { variantPrice } = getProductPrice({
    product,
    variantId,
  })

  const variantStock =
    product.variants?.find(({ id }) => id === variantId)?.inventory_quantity ||
    0

  const variantHasPrice = !!product.variants?.find(({ id }) => id === variantId)
    ?.calculated_price

  const isVariantStockMaxLimitReached =
    (cart?.items?.find((item) => item.variant_id === variantId)?.quantity ??
      0) >= variantStock

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variantId || !hasAnyPrice || isVariantStockMaxLimitReached) return

    const subtotal = +(variantPrice?.calculated_price_without_tax_number || 0)
    const total = +(variantPrice?.calculated_price_number || 0)

    const storeCartLineItem = {
      thumbnail: product.thumbnail || "",
      product_title: product.title,
      quantity: 1,
      subtotal,
      total,
      tax_total: total - subtotal,
      variant_id: variantId,
      product_id: product.id,
      variant: product.variants?.find(({ id }) => id === variantId),
    }

    // Optimistic update
    onAddToCart(storeCartLineItem, variantPrice?.currency_code || "eur")

    try {
      await addToCart({
        variantId: variantId,
        quantity: 1,
        countryCode: locale,
      })
    } catch (error) {
      toast.error({
        title: "Error adding to cart",
        description: "Some variant does not have the required inventory",
      })
    }
  }

  const isAddToCartDisabled = !variantStock || !variantHasPrice || !hasAnyPrice || isVariantStockMaxLimitReached

  return (
    <div className="border border-gray-200 rounded-xl p-6 lg:p-8 bg-white shadow-sm" data-testid="product-details-header">
      <div className="flex justify-between items-start mb-4">
        <div className="pr-4">
          <h1 className="text-3xl lg:text-4xl font-black text-[#1b103c] leading-tight mb-2" data-testid="product-title">
            {product.title}
          </h1>
          <div className="mt-4 flex gap-3 items-end" data-testid="product-price-container">
            {hasAnyPrice && variantPrice ? (
              <>
                <span className="text-4xl font-black tracking-tighter text-[#1b103c]" data-testid="product-price-current">
                  {variantPrice.calculated_price}
                </span>
                {variantPrice.calculated_price_number !==
                  variantPrice.original_price_number && (
                    <span className="text-lg text-gray-400 line-through mb-1 font-medium" data-testid="product-price-original">
                      {variantPrice.original_price}
                    </span>
                  )}
              </>
            ) : (
              <span className="text-lg text-red-500 font-semibold pt-2 pb-4" data-testid="product-price-unavailable">
                NO DISPONIBLE EN SU REGIÓN
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 bg-gray-50 rounded-full p-2 hover:bg-gray-100 transition-colors">
          {/* Add to Wishlist */}
          <WishlistButton
            productId={product.id}
            wishlist={wishlist}
            user={user}
          />
        </div>
      </div>

      <div className="w-full mb-8 mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Especificaciones Principales</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#ec7b15] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105 shadow-md hover:shadow-lg group/spec">
            <span className="text-2xl mb-1">📅</span>
            <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Año</span>
            <span className="text-sm font-black text-white">{product?.options?.find(o => o.title?.toLowerCase() === 'año')?.values?.[0]?.value || '2024'}</span>
          </div>
          <div className="bg-[#ec7b15] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105 shadow-md hover:shadow-lg group/spec">
            <span className="text-2xl mb-1">🛣️</span>
            <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Estado</span>
            <span className="text-sm font-black text-white">{product?.options?.find(o => o.title?.toLowerCase() === 'estado' || o.title?.toLowerCase() === 'kilometraje')?.values?.[0]?.value === 'Nueva' ? '0 km' : 'Usada'}</span>
          </div>
          <div className="bg-[#ec7b15] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105 shadow-md hover:shadow-lg group/spec">
            <span className="text-2xl mb-1">🏍️</span>
            <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Motor</span>
            <span className="text-sm font-black text-white">{product?.options?.find(o => o.title?.toLowerCase() === 'cilindrada')?.values?.[0]?.value || 'Motor'}</span>
          </div>
          <div className="bg-[#ec7b15] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:scale-105 shadow-md hover:shadow-lg group/spec">
            <span className="text-2xl mb-1">🏷️</span>
            <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Marca</span>
            <span className="text-sm font-black text-white">{product?.options?.find(o => o.title?.toLowerCase() === 'marca')?.values?.[0]?.value || 'Glik Moto'}</span>
          </div>
        </div>
      </div>

      {/* Product Variants */}
      {hasAnyPrice && (
        <div className="mb-6">
          <ProductVariants product={product} selectedVariant={selectedVariant} />
        </div>
      )}

      {/* Add to Cart */}
      <Button
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
        loading={isAddingItem}
        className="w-full bg-[#ec7b15] text-white py-4 text-base font-bold rounded-xl hover:bg-[#d66a0e] uppercase mb-4 flex justify-center shadow-lg hover:shadow-xl transition-all h-[56px]"
        size="large"
        data-testid="product-add-to-cart-button"
      >
        {!hasAnyPrice
          ? "NO DISPONIBLE EN SU REGIÓN"
          : variantStock && variantHasPrice
            ? "SIMULAR CRÉDITO O COMPRAR"
            : "AGOTADO"}
      </Button>

      {/* Seller message */}
      {user && product.seller && (
        <div className="mt-2">
          <Chat
            user={user}
            seller={product.seller}
            buttonClassNames="w-full uppercase font-bold text-sm h-[48px]"
            product={product}
          />
        </div>
      )}
    </div>
  )
}
