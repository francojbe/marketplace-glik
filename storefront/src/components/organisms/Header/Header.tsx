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
import { ParentCategoryLinks } from "@/components/molecules"

export const Header = async ({ locale }: {
  locale: string
}) => {
  const user = await retrieveCustomer().catch(() => null)
  const isLoggedIn = Boolean(user)

  let wishlist: Wishlist = { products: [] }
  if (user) {
    wishlist = await getUserWishlists({ countryCode: locale }).catch(() => ({ products: [] }))
  }

  const regions = await listRegions().catch(() => [])

  const wishlistCount = wishlist?.products.length || 0

  let categories: HttpTypes.StoreProductCategory[] = []
  let parentCategories: HttpTypes.StoreProductCategory[] = []

  try {
    const data = await listCategories({ query: { include_ancestors_tree: true } })
    categories = data.categories
    parentCategories = data.parentCategories
  } catch (err) {
    console.error("Error fetching categories:", err)
  }
  return (
    <header data-testid="header" className="relative z-50">
      {/* GLIK TOP BANNER - This moves with scroll */}
      <div className="bg-[#003087] text-white py-1 text-center w-full shadow-sm relative z-20 overflow-hidden">
        <div className="container flex justify-center items-center gap-2 md:gap-3">
          <h1 className="text-[9px] md:text-[11px] font-bold tracking-widest leading-none">GLIK MOTOS MARKETPLACE</h1>
          <div className="hidden md:block w-1 h-1 rounded-full bg-[#00d4aa]"></div>
          <p className="text-[8px] md:text-[9px] opacity-90 uppercase font-medium leading-none mt-[1px]">Compra motos en cuotas seguras con Glik garante</p>
        </div>
      </div>

      {/* STICKY WRAPPER - This stays at the top */}
      <div className="sticky top-0 z-50 shadow-md bg-[#1b103c]">
        <div className="flex justify-between items-center py-2.5 lg:px-8 px-4 md:px-5 border-b border-white/10" data-testid="header-top">
          {/* LOGO - LEFT */}
          <div className="flex items-center shrink-0">
            <MobileNavbar
              parentCategories={parentCategories}
              categories={categories}
            />
            <LocalizedClientLink href="/" className="ml-3 lg:ml-0 flex items-center gap-4" data-testid="header-logo-link">
              <Image
                src="/logo-glik.png"
                width={132}
                height={38}
                alt="Glik Motos Logo"
                className="object-contain hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="hidden sm:flex items-center bg-[#00d4aa]/10 border border-[#00d4aa]/20 px-3 py-1 rounded-full text-[9px] font-black text-[#00d4aa] tracking-tighter uppercase whitespace-nowrap">
                🏆 MARKETPLACE N°1 EN CHILE
              </div>
            </LocalizedClientLink>
          </div>

          {/* NAVIGATION - CENTER */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-6 border-none">
            <ParentCategoryLinks
              parentCategories={parentCategories}
              categories={categories}
            />
          </div>

          {/* ACTIONS - RIGHT */}
          <div className="flex items-center justify-end gap-3 lg:gap-5 shrink-0" data-testid="header-actions">
            <CountrySelector regions={regions} />
            {isLoggedIn && <MessageButton />}
            <UserDropdown isLoggedIn={isLoggedIn} />
            {isLoggedIn && (
              <LocalizedClientLink href="/user/wishlist" className="relative flex items-center justify-center text-white" data-testid="header-wishlist-link">
                <HeartIcon size={20} />
                {Boolean(wishlistCount) && (
                  <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 text-[10px]" data-testid="wishlist-count-badge">
                    {wishlistCount}
                  </Badge>
                )}
              </LocalizedClientLink>
            )}

            <div className="text-white flex items-center justify-center">
              <CartDropdown />
            </div>
          </div>
        </div>
        <Navbar categories={categories} parentCategories={parentCategories} />
      </div>
    </header>
  )
}
