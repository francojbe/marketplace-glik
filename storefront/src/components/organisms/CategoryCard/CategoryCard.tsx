import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export function CategoryCard({
  category,
}: {
  category: { name: string; handle: string; image?: string }
}) {
  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="relative flex flex-col items-center border border-gray-100 rounded-sm bg-gray-50 transition-all hover:rounded-3xl hover:border-[#00d4aa] hover:shadow-lg w-[140px] sm:w-[180px] p-2 aspect-square justify-center"
    >
      <div className="flex relative aspect-square overflow-hidden w-full items-center justify-center p-2">
        <Image
          loading="lazy"
          src={category.image || `/images/categories/${category.handle}.png`}
          alt={`category - ${category.name}`}
          fill
          sizes="(min-width: 640px) 160px, 120px"
          className="object-contain scale-[0.80] transition-transform duration-300 hover:scale-100"
        />
      </div>
      <h3 className="w-full text-center text-xs sm:text-sm font-bold text-[#003087] mt-1">
        {category.name}
      </h3>
    </LocalizedClientLink>
  )
}
