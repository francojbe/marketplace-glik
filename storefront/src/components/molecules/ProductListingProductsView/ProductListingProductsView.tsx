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
      "w-full gap-4",
      viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2" 
        : "flex flex-col"
    )}>
      {products.map(
        (product) =>
           (
            <li 
              key={product.id} 
              className="w-full transition-all duration-300 transform hover:-translate-y-1"
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
