import Image from "next/image"
import { ArrowRightIcon } from "@/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="relative w-full h-[80vh] min-h-[550px] lg:min-h-[700px] flex justify-center mt-0 overflow-hidden bg-[#1a1a1a]">
      {/* Background Image */}
      <Image
        src={decodeURIComponent(image)}
        fill
        alt={`Hero banner - ${heading}`}
        className="object-cover object-center opacity-60 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
      />
      {/* Gradient Overlays for deep contrast and brand colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/80 lg:from-[#003087]/90 via-[#003087]/20 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full container mx-auto px-6 lg:px-8 flex flex-col justify-center text-white h-full">
        <div className="max-w-3xl backdrop-blur-md bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/50 text-[#00d4aa] font-bold text-xs tracking-widest uppercase mb-6 animate-fade-in">
            NUEVA ERA MOTOR EST. 2026
          </div>
          <h2 className="font-black mb-6 text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] drop-shadow-2xl text-balance bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-300">
            {heading}
          </h2>
          <p className="text-lg md:text-2xl mb-10 font-light text-gray-200 border-l-4 border-[#00d4aa] pl-5 opacity-90">
            {paragraph}
          </p>

          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {buttons.map(({ label, path }, index) => {
                const isPrimary = index === 0;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cn(
                      "group flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 uppercase tracking-widest",
                      isPrimary
                        ? "bg-[#00d4aa] text-[#1a1a1a] hover:bg-white hover:text-[#003087] shadow-[0_0_20px_rgba(0,212,170,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                        : "bg-transparent backdrop-blur-md border-[1.5px] border-white/40 text-white hover:bg-white/10 hover:border-white"
                    )}
                    aria-label={label}
                    title={label}
                  >
                    {label}
                    {isPrimary && (
                      <ArrowRightIcon className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" color="currentColor" aria-hidden />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
