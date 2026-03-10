import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowRightIcon } from "@/icons"
import { Style } from "@/types/styles"

export const styles: Style[] = [
  {
    id: 1,
    name: "STREET / NAKED",
    href: "/categories/street",
  },
  {
    id: 2,
    name: "ADVENTURE",
    href: "/categories/adventure",
  },
  {
    id: 3,
    name: "SCOOTER",
    href: "/categories/scooters",
  },
  {
    id: 4,
    name: "DEPORTIVAS",
    href: "/categories/sport",
  },
  {
    id: 5,
    name: "CRUISER",
    href: "/categories/cruiser",
  },
]

export function ShopByStyleSection() {
  return (
    <section className="bg-primary container">
      <h2 className="heading-lg text-primary mb-12 uppercase">Encuentra Tu Estilo</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="py-[52px] px-[58px] h-full border rounded-sm">
          {styles.map((style) => (
            <LocalizedClientLink
              key={style.id}
              href={style.href}
              className="group flex items-center gap-4 text-primary hover:text-[#00d4aa] transition-colors border-b border-transparent hover:border-[#00d4aa] w-fit pb-2 mb-8"
            >
              <span className="heading-lg font-bold">{style.name}</span>
              <ArrowRightIcon className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00d4aa]" />
            </LocalizedClientLink>
          ))}
        </div>
        <div className="relative hidden w-full lg:flex justify-center items-center h-full p-10 bg-gray-50 border rounded-sm">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="https://glik7.com/wp-content/uploads/2024/09/Diagonal-express-negro.png"
            alt="Motos para todos los estilos"
            width={700}
            height={600}
            className="object-contain w-[80%] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  )
}
