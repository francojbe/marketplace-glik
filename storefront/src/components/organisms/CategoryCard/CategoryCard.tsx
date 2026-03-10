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
      className="relative flex flex-col items-center border border-gray-100 rounded-sm bg-gray-50 transition-all hover:rounded-full hover:border-[#00d4aa] hover:shadow-lg w-[233px] aspect-square"
    >
      <div className="flex relative aspect-square overflow-hidden w-[200px] items-center justify-center p-4">
        <Image
          loading="lazy"
          src={category.image || `/images/categories/${category.handle}.png`}
          alt={`category - ${category.name}`}
          width={200}
          height={200}
          sizes="(min-width: 1024px) 200px, 40vw"
          className="object-contain scale-[0.80] transition-transform duration-300 hover:scale-100"
        />
      </div>
      <h3 className="w-full text-center label-lg font-bold text-[#003087]">
        {category.name}
      </h3>
    </LocalizedClientLink>
  )
}
