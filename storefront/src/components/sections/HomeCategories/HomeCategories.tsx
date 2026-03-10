import { Carousel } from "@/components/cells"
import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string; image: string }[] = [
  {
    id: 1,
    name: "Scooters",
    handle: "scooters",
    image: "https://glik7.com/wp-content/uploads/2024/09/suzuki-swift-gris.png",
  },
  {
    id: 2,
    name: "Deportivas",
    handle: "sport",
    image: "https://glik7.com/wp-content/uploads/2024/09/Diagonal-express-negro.png",
  },
  {
    id: 3,
    name: "Adventure",
    handle: "adventure",
    image: "https://glik7.com/wp-content/uploads/2024/09/Kavak-azul-con-morado.png",
  },
  {
    id: 4,
    name: "Street",
    handle: "street",
    image: "https://glik7.com/wp-content/uploads/2024/09/2-removebg-preview.png",
  },
  {
    id: 5,
    name: "Cruiser",
    handle: "cruiser",
    image: "https://glik7.com/wp-content/uploads/2024/09/Motor-horse.png",
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
