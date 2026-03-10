import { HttpTypes } from "@medusajs/types"
import { ProductCard } from "@/components/organisms"
import { cn } from "@/lib/utils"

interface Props {
  products: HttpTypes.StoreProduct[]
  viewMode?: "grid" | "list"
}

const ProductListingProductsView = ({ products, viewMode = "grid" }: Props) => (
  <div className="w-full">
    <ul className={cn(
      "flex flex-wrap gap-4",
      viewMode === "list" && "flex-col"
    )}>
      {products.map(
        (product) =>
           (
            <li 
              key={product.id} 
              className={cn(
                "w-full transition-all duration-300",
                viewMode === "grid" ? "lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)] min-w-[220px]" : "w-full"
              )}
            >
              <ProductCard
                product={product}
                variant={viewMode}
                className="w-full h-full"
              />
            </li>
          )
      )}
    </ul>
  </div>
)

export default ProductListingProductsView
