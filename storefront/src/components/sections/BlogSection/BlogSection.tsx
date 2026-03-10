import { BlogPost } from '@/types/blog';
import { BlogCard } from '@/components/organisms';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Guía de Mantenimiento Básico",
    excerpt:
      "Aprende a revisar la cadena, frenos y niveles de aceite para alargar la vida útil de tu moto y viajar seguro.",
    image: "https://images.unsplash.com/photo-1547623641-82fbb83476e9?q=80&w=800",
    category: "MANTENIMIENTO",
    href: "/blog/mantenimiento",
  },
  {
    id: 2,
    title: "Travesía por la Carretera Austral",
    excerpt:
      "Los mejores consejos, equipaje necesario y paradas obligatorias para realizar el viaje de tus sueños en dos ruedas.",
    image: "https://images.unsplash.com/photo-1469033011856-3932dc730544?q=80&w=800",
    category: "RUTAS",
    href: "/blog/rutas-austral",
  },
  {
    id: 3,
    title: "Importancia del Casco Certificado",
    excerpt:
      "No escatimes en seguridad: descubre las diferencias entre las certificaciones DOT, ECE y SNELL para elegir tu casco.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800",
    category: "SEGURIDAD",
    href: "/blog/seguridad-casco",
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
