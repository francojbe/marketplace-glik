"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms"
import { useParams } from "next/navigation"
import { useMemo } from "react"
import { getActiveParentHandle } from "@/lib/helpers/category-utils"

export const HeaderCategoryNavbar = ({
  parentCategories,
  categories,
  onClose,
}: {
  parentCategories: HttpTypes.StoreProductCategory[]
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const { category } = useParams<{ category?: string }>()

  const activeParentHandle = useMemo(
    () => getActiveParentHandle(category, categories, parentCategories),
    [category, categories, parentCategories]
  )

  return (
    <nav
      className="flex items-center p-4 gap-2 overflow-x-auto scrollbar-hide"
      aria-label="Parent categories"
    >
      {parentCategories?.map(({ id, handle, name }) => {
        const isActive = handle === activeParentHandle
        return (
          <LocalizedClientLink
            key={id}
            href={`/categories/${handle}`}
            onClick={() => (onClose ? onClose(false) : null)}
            className={cn(
              "label-large uppercase text-white hover:text-[#00d4aa] transition-colors py-2 font-bold px-8",
              isActive && "border-b-2 border-[#00d4aa] text-[#00d4aa]"
            )}
          >
            {name}
          </LocalizedClientLink>
        )
      })}
    </nav>
  )
}
