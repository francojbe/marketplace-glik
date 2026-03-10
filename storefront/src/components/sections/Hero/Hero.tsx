"use client";

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
    <section className="relative w-full h-[85vh] min-h-[600px] lg:min-h-[750px] flex justify-center mt-0 overflow-hidden bg-[#0a0a0b]">
      {/* Background Image with Ken Burns effect */}
      <Image
        src={decodeURIComponent(image)}
        fill
        alt={`Hero banner - ${heading}`}
        className="object-cover object-center translate-z-0 scale-105 animate-[ken-burns_20s_ease-in-out_infinite_alternate]"
        priority
        fetchPriority="high"
        quality={90}
        sizes="100vw"
      />

      {/* Premium Multi-layer Gradients */}
      <div className="absolute inset-0 bg-neutral-950/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1b103c]/90 via-[#1b103c]/40 to-transparent"></div>

      {/* Accent Light - Subtle orange glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ec7b15]/20 blur-[120px] rounded-full"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full container mx-auto px-6 lg:px-12 flex flex-col justify-center text-white h-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] tracking-[0.2em] uppercase mb-8 animate-fade-in shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#ec7b15] animate-pulse"></span>
            MARKETPLACE Nº1 EN CHILE
          </div>

          <div className="animate-[fade-in-up_1s_ease-out]">
            <h1 className="font-black mb-6 text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1] drop-shadow-2xl text-balance">
              {heading.split(' - ').map((part, i) => (
                <span key={i} className={cn("block", i === 1 && "text-[#ec7b15] mt-2")}>{part}</span>
              ))}
            </h1>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl mb-12 font-medium text-gray-300 max-w-2xl leading-relaxed opacity-95 animate-[fade-in-up_1.2s_ease-out]">
            {paragraph.split('Glik garante').map((text, i, arr) => (
              <React.Fragment key={i}>
                {text}
                {i < arr.length - 1 && (
                  <span className="text-[#00d4aa] font-black underline decoration-2 underline-offset-4">Glik garante</span>
                )}
              </React.Fragment>
            ))}
          </p>

          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-5">
              {buttons.map(({ label, path }, index) => {
                const isPrimary = index === 0;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cn(
                      "group flex items-center justify-center px-10 py-5 rounded-2xl font-black text-sm md:text-base transition-all duration-500 uppercase tracking-[2px] shadow-2xl overflow-hidden relative",
                      isPrimary
                        ? "bg-[#ec7b15] text-white hover:bg-white hover:text-[#1b103c] scale-100 hover:scale-105 active:scale-95"
                        : "bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      {label}
                      {isPrimary && (
                        <ArrowRightIcon className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" color="currentColor" />
                      )}
                    </span>
                    {isPrimary && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes ken-burns {
          from { transform: scale(1); }
          to { transform: scale(1.15) translate(1%, 1%); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
