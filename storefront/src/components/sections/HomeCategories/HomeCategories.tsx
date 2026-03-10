import { Carousel } from "@/components/cells"
import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string; image: string }[] = [
  {
    id: 1,
    name: "Scooters",
    handle: "scooters",
    image: "https://images.unsplash.com/photo-1541806086694-81788bc50d26?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Deportivas",
    handle: "sport",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Adventure",
    handle: "adventure",
    image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Street",
    handle: "street",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Cruiser",
    handle: "cruiser",
    image: "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?q=80&w=2000&auto=format&fit=crop",
  },
]

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section className="bg-primary py-8 w-full">
      <div className="mb-6">
        <h2 className="heading-lg text-primary uppercase">{heading}</h2>
      </div>
      <Carousel
        items={categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      />
    </section>
  )
}
