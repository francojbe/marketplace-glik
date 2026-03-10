import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { CartDropdown, MobileNavbar, Navbar } from "@/components/cells"
import { HeartIcon } from "@/icons"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { Wishlist } from "@/types/wishlist"
import { Badge } from "@/components/atoms"
import CountrySelector from "@/components/molecules/CountrySelector/CountrySelector"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { MessageButton } from "@/components/molecules/MessageButton/MessageButton"
import { listCategories } from "@/lib/data/categories"
import { listRegions } from "@/lib/data/regions"
import { getUserWishlists } from "@/lib/data/wishlist"
import { retrieveCustomer } from "@/lib/data/customer"
import { ParentCategoryLinks } from "@/components/molecules/ParentCategoryLinks/ParentCategoryLinks"

export const Header = async ({ locale }: {
  locale: string
}) => {
  const user = await retrieveCustomer().catch(() => null)
  const isLoggedIn = Boolean(user)

  let wishlist: Wishlist = { products: [] }
  if (user) {
    wishlist = await getUserWishlists({ countryCode: locale })
  }

  const regions = await listRegions()

  const wishlistCount = wishlist?.products.length || 0

  const { categories, parentCategories } = (await listCategories({ query: { include_ancestors_tree: true } })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }
  return (
    <header data-testid="header" className="bg-[#1b103c] text-white sticky top-0 z-50 shadow-md">
      {/* GLIK TOP BANNER */}
      <div className="bg-[#003087] text-white py-2 text-center w-full shadow-[0_2px_10px_rgba(0,0,0,0.3)] relative z-10">
        <h1 className="text-sm md:text-base font-bold tracking-wider">GLIK MOTOS MARKETPLACE</h1>
        <p className="text-[10px] md:text-xs opacity-90 uppercase mt-0.5">Compra motos en cuotas seguras con Glik garante</p>
      </div>

      <div className="flex justify-between items-center py-4 lg:px-8 px-4 md:px-5 border-b border-white/10 bg-[#1b103c]" data-testid="header-top">
        {/* LOGO - LEFT */}
        <div className="flex items-center shrink-0">
          <MobileNavbar
            parentCategories={parentCategories}
            categories={categories}
          />
          <LocalizedClientLink href="/" className="ml-4 lg:ml-0 flex items-center" data-testid="header-logo-link">
            <Image
              src="/logo-glik.png"
              width={140}
              height={40}
              alt="Glik Motos Logo"
              className="object-contain"
              priority
            />
          </LocalizedClientLink>
        </div>

        {/* NAVIGATION - CENTER */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8 border-none">
          <ParentCategoryLinks
            parentCategories={parentCategories}
            categories={categories}
          />
        </div>

        {/* ACTIONS - RIGHT */}
        <div className="flex items-center justify-end gap-2 lg:gap-4 shrink-0" data-testid="header-actions">
          <CountrySelector regions={regions} />
          {isLoggedIn && <MessageButton />}
          <UserDropdown isLoggedIn={isLoggedIn} />
          {isLoggedIn && (
            <LocalizedClientLink href="/user/wishlist" className="relative" data-testid="header-wishlist-link">
              <HeartIcon size={20} />
              {Boolean(wishlistCount) && (
                <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0" data-testid="wishlist-count-badge">
                  {wishlistCount}
                </Badge>
              )}
            </LocalizedClientLink>
          )}

          <CartDropdown />
        </div>
      </div>
      <Navbar categories={categories} parentCategories={parentCategories} />
    </header>
  )
}
