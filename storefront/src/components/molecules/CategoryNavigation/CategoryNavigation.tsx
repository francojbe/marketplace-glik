"use client"

import React from "react"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { MOTO_CATEGORIES } from "@/lib/constants/moto-data"
import { cn } from "@/lib/utils"

// Helper SVG icons as local components for simplicity in this expert implementation
const CategoryIcon = ({ type }: { type: string }) => {
    // Simple representative shapes for icons
    switch (type) {
        case "ScooterIcon":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 18s-2-1-2-4 2-4 2-4 2 1 2 4-2 4-2 4Z" /><path d="M18 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" /><path d="M6 10H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" /><path d="M15 6h-6" /><path d="M12 2v4" />
                </svg>
            )
        case "NakedIcon":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="m16 8-8 8m0-8 8 8" />
                </svg>
            )
        case "TrailIcon":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M17 14V9a2 2 0 0 0-2-2H9L7 14" />
                </svg>
            )
        case "CustomIcon":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                </svg>
            )
        case "EnduroIcon":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2 22 1-1h3l9-9" /><path d="M14 11V9a2 2 0 0 1 2-2h1" /><path d="m20 22 1-1h1" />
                </svg>
            )
        case "ElectricIcon":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            )
        default:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
                </svg>
            )
    }
}

export const CategoryNavigation = () => {
    return (
        <section className="w-full py-8 overflow-x-auto no-scrollbar bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex px-4 gap-4 md:gap-6 min-w-max justify-around">
                {MOTO_CATEGORIES.map((cat) => (
                    <LocalizedClientLink
                        key={cat.id}
                        href={`/categories/${cat.handle}`}
                        className="flex flex-col items-center group space-y-3 transition-all transform hover:scale-105"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#ec7b15] group-hover:text-white transition-colors shadow-sm ring-1 ring-gray-100 relative">
                            <CategoryIcon type={cat.icon} />
                            <span className="absolute -top-1 -right-1 bg-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-gray-100 shadow-sm opacity-60 group-hover:opacity-100 transition-opacity">
                                {Math.floor(Math.random() * 50) + 12}
                            </span>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-center max-w-[80px] leading-tight text-gray-600 group-hover:text-[#ec7b15]">
                            {cat.name}
                        </span>
                    </LocalizedClientLink>
                ))}
            </div>
        </section>
    )
}
