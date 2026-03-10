"use client";
import React from "react"

import Image from "next/image"
import { ArrowRightIcon } from "@/icons"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { NavbarSearch } from "@/components/molecules"
import { cn } from "@/lib/utils"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[500px] flex justify-center mt-0 overflow-hidden bg-[#0a0a0b]">
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
      <div className="relative z-10 w-full container mx-auto px-4 lg:px-8 flex flex-col justify-center items-center text-center text-white h-full pt-8">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] tracking-[0.1em] uppercase mb-4 shadow-sm animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ec7b15] animate-pulse"></span>
            MARKETPLACE Nº1 EN CHILE
          </div>

          <div className="animate-[fade-in-up_0.8s_ease-out]">
            <h1 className="font-black mb-3 text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.1] drop-shadow-lg text-balance">
              {heading.split(' - ').map((part, i) => (
                <span key={i} className={cn("block", i === 1 && "text-[#ec7b15]")}>{part}</span>
              ))}
            </h1>
          </div>

          <p className="text-xs md:text-sm lg:text-base mb-6 font-medium text-gray-300 max-w-xl mx-auto leading-tight opacity-95 animate-[fade-in-up_1s_ease-out]">
            {paragraph.split('Glik garante').map((text, i, arr) => (
              <React.Fragment key={i}>
                {text}
                {i < arr.length - 1 && (
                  <span className="text-[#00d4aa] font-black underline decoration-2 underline-offset-4">Glik garante</span>
                )}
              </React.Fragment>
            ))}
          </p>

          <div className="w-full max-w-2xl mx-auto mb-6 animate-[fade-in-up_1.2s_ease-out]">
             <NavbarSearch />
          </div>

          {buttons.length > 0 && (
            <div className="flex flex-row justify-center gap-3">
              {buttons.map(({ label, path }, index) => {
                const isPrimary = index === 0;
                return (
                  <LocalizedClientLink
                    key={path}
                    href={path}
                    className={cn(
                      "group flex items-center justify-center px-4 py-2 rounded-sm font-bold text-[11px] transition-all duration-300 uppercase shadow-md overflow-hidden relative",
                      isPrimary
                        ? "bg-[#ec7b15] text-white hover:bg-[#d06b0d]"
                        : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      {label}
                      {isPrimary && (
                        <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" color="currentColor" />
                      )}
                    </span>
                  </LocalizedClientLink>
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
