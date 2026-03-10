import { BlogPost } from '@/types/blog';
import { BlogCard } from '@/components/organisms';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mantenimiento Preventivo para tu Motor",
    excerpt:
      "Descubre los 5 puntos clave para mantener tu moto en perfectas condiciones durante cada temporada del año.",
    image: "https://glik7.com/wp-content/uploads/2024/09/Testimonios-768x104.png", // Usando logo como placeholder de blog
    category: "GUÍA TÉCNICA",
    href: "#",
  },
  {
    id: 2,
    title: "Las Mejores Rutas para Aventureros",
    excerpt:
      "Desde el desierto hasta la costa: explora las rutas más espectaculares que todo motociclista debe recorrer.",
    image: "https://glik7.com/wp-content/uploads/2024/09/Screenshot_105-1024x450.png", // Imagen de landing como placeholder
    category: "RUTAS Y VIAJES",
    href: "#",
  },
  {
    id: 3,
    title: "Nuevas Tecnologías en Seguridad",
    excerpt:
      "Conoce cómo los sistemas ABS pro y el control de tracción adaptativo están salvando vidas en la ciudad.",
    image: "https://glik7.com/wp-content/uploads/2024/10/Screenshot_113.png",
    category: "TENDENCIAS",
    href: "#",
  },
];

export function BlogSection() {
  return (
    <section className="bg-tertiary container">
      <div className="flex items-center justify-between mb-12">
        <h2 className="heading-lg text-tertiary uppercase">
          MANTENTE AL DÍA
        </h2>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            index={index}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}
