import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
  parentCategories,
}: {
  categories: HttpTypes.StoreProductCategory[]
  parentCategories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="flex flex-col lg:flex-row border-t border-b border-white/10 py-4 justify-between px-4 md:px-5 gap-4 md:gap-0 bg-[#1a1a1a]" data-testid="navbar">
      <div className="hidden lg:flex items-center justify-between w-full">
        <CategoryNavbar
          categories={categories}
          parentCategories={parentCategories}
        />
        <div className="ml-auto max-w-[296px] w-full pl-4" data-testid="navbar-search-desktop">
          <NavbarSearch />
        </div>
      </div>
      <div className="lg:hidden w-full flex justify-center" data-testid="navbar-search-mobile">
        <NavbarSearch className="w-full" />
      </div>
    </div>
  )
}
