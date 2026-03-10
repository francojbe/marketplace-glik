import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar } from "@/components/molecules"

export const Navbar = ({
  categories,
  parentCategories,
}: {
  categories: HttpTypes.StoreProductCategory[]
  parentCategories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="flex flex-col lg:flex-row border-t border-b border-white/10 py-1.5 justify-start px-4 md:px-5 gap-4 md:gap-0 bg-[#1b103c]" data-testid="navbar">
      <div className="hidden lg:flex items-center w-full max-w-[1440px] mx-auto">
        <CategoryNavbar
          categories={categories}
          parentCategories={parentCategories}
        />
      </div>
    </div>
  )
}
