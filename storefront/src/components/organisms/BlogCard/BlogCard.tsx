import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { BlogPost } from "@/types/blog"
import { ArrowRightIcon } from "@/icons"
import tailwindConfig from "../../../../tailwind.config"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <LocalizedClientLink
      href={post.href}
      className={cn(
        "group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        index > 0 && "hidden lg:flex"
      )}
    >
      <div className="relative overflow-hidden aspect-[16/10] w-full">
        <Image
          loading="lazy"
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={decodeURIComponent(post.image)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#1b103c] text-[#00d4aa] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-widest">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Por Glik</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">hace 2 días</span>
          </div>
          <h3 className="text-xl font-black text-[#1b103c] mb-3 leading-tight group-hover:text-[#ec7b15] transition-colors">{post.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-black text-[#1b103c] uppercase tracking-[2px] mt-6 group-hover:gap-4 transition-all">
          Leer más
          <ArrowRightIcon
            size={14}
            className="text-[#ec7b15]"
          />
        </div>
      </div>
    </LocalizedClientLink>
  )
}
