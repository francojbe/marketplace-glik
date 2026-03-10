import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowRightIcon } from "@/icons"
import { Style } from "@/types/styles"

const stylesWithDetails = [
  { id: 1, name: "STREET / NAKED", href: "/categories/naked", icon: "🏍️", count: 48 },
  { id: 2, name: "ADVENTURE", href: "/categories/trail", icon: "🏔️", count: 32 },
  { id: 3, name: "SCOOTER", href: "/categories/scooter", icon: "🛵", count: 56 },
  { id: 4, name: "DEPORTIVAS", href: "/categories/sport", icon: "🏎️", count: 24 },
  { id: 5, name: "CRUISER", href: "/categories/custom", icon: "🦅", count: 18 },
]

export function ShopByStyleSection() {
  return (
    <section className="bg-primary container">
      <div className="flex items-end justify-between mb-12">
        <h2 className="heading-lg text-primary uppercase leading-none">Encuentra Tu Estilo</h2>
        <LocalizedClientLink href="/categories/motos" className="text-sm font-bold text-[#ec7b15] hover:underline underline-offset-4 uppercase tracking-widest">Ver todo el catálogo</LocalizedClientLink>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {stylesWithDetails.map((style) => (
            <LocalizedClientLink
              key={style.id}
              href={style.href}
              className="group relative flex flex-col justify-end p-6 border rounded-2xl h-[160px] overflow-hidden bg-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-100"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 transform grayscale group-hover:grayscale-0">
                {style.icon}
              </div>
              <div className="relative z-10">
                <h3 className="heading-sm font-black transition-all duration-300 group-hover:text-[#ec7b15] group-hover:scale-105 origin-left">{style.name}</h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">{style.count} motos disponibles</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent group-hover:from-[#1b103c]/5 transition-all duration-500"></div>
            </LocalizedClientLink>
          ))}
        </div>
        <div className="relative hidden w-full lg:flex justify-center items-center h-full p-10 bg-gradient-to-br from-gray-50 to-white border rounded-[2rem] overflow-hidden group/main overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <Image
            loading="lazy"
            fetchPriority="high"
            src="https://glik7.com/wp-content/uploads/2024/09/Diagonal-express-negro.png"
            alt="Motos para todos los estilos"
            width={700}
            height={600}
            className="relative z-10 object-contain w-[85%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover/main:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </section>
  )
}
