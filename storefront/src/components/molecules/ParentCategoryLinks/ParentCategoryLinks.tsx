"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import { getActiveParentHandle } from "@/lib/helpers/category-utils"

interface ParentCategoryLinksProps {
  parentCategories: HttpTypes.StoreProductCategory[]
  categories: HttpTypes.StoreProductCategory[]
}

export const ParentCategoryLinks = () => {
  const links = [
    { label: "INICIO", href: "/" },
    { label: "NUESTROS PRODUCTOS", href: "/categories/motos" },
    { label: "¿CÓMO ARRENDAR?", href: "#" },
    { label: "¿QUIÉNES SOMOS?", href: "#" },
    { label: "CONTÁCTANOS", href: "#" },
  ];

  return (
    <nav
      className="hidden lg:flex items-center gap-3 xl:gap-5"
      aria-label="Corporate Categories"
    >
      {links.map((link, index) => (
        <div key={link.label} className="flex items-center gap-3 xl:gap-5">
          <LocalizedClientLink
            href={link.href}
            className="text-[11px] xl:text-[13px] uppercase text-white hover:text-[#ec7b15] transition-colors font-medium tracking-wider"
          >
            {link.label}
          </LocalizedClientLink>
          {index < links.length - 1 && (
            <div className="w-1 h-1 rounded-full bg-[#ec7b15]"></div>
          )}
        </div>
      ))}
    </nav>
  )
}
