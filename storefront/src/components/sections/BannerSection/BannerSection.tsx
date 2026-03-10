import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export const BannerSection = () => {
  return (
    <section className="bg-tertiary container text-tertiary">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="py-6 px-6 md:p-10 flex flex-col h-full justify-between border border-[#003087]/20 rounded-xl bg-gradient-to-br from-white to-gray-50">
          <div className="mb-8 lg:mb-8">
            <span className="text-xs font-bold text-[#003087] bg-[#003087]/10 tracking-widest inline-block px-4 py-1.5 rounded-full mb-4">
              #MOVILIDAD
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#1a1a1a] leading-tight">
              LLEGA MÁS LEJOS, DECIDE LA RUTA
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              Descubre las mejores opciones en scooters y motos de calle para moverte libremente por la ciudad. Financiamiento a tu medida garantizado.
            </p>
          </div>
          <LocalizedClientLink href="/categories/scooter">
            <Button size="large" className="w-fit bg-[#003087] text-white hover:bg-[#00d4aa] transition-colors rounded">
              VER SCOOTERS
            </Button>
          </LocalizedClientLink>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full flex justify-end rounded-xl overflow-hidden shadow-lg border border-gray-100">
          <Image
            loading="lazy"
            fetchPriority="low"
            src="https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1200"
            alt="Motos y scooters Glik"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
