import { CategoryNavigation } from "@/components/molecules"

export default function ComoArrendarPage() {
    return (
        <main className="container py-24 min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-black mb-8 uppercase italic border-b-4 border-[#ec7b15] w-fit">
                    ¿Cómo arrendar en Glik?
                </h1>
                <div className="prose prose-lg text-gray-600 mb-12">
                    <p>
                        Arrendar tu próxima moto en Glik es un proceso simple, rápido y 100% digital.
                        Diseñamos un sistema que permite a nuestros usuarios disfrutar de la movilidad
                        sin las complicaciones de la compra tradicional.
                    </p>
                    <h2 className="text-2xl font-bold text-[#1b103c] mt-8 mb-4">1. Elige tu moto</h2>
                    <p>Explora nuestro catálogo de motos garantizadas y selecciona la que mejor se adapte a tus necesidades.</p>

                    <h2 className="text-2xl font-bold text-[#1b103c] mt-8 mb-4">2. Evaluación rápida</h2>
                    <p>Completa el formulario de contacto y nuestro equipo te evaluará en menos de 24 horas.</p>

                    <h2 className="text-2xl font-bold text-[#1b103c] mt-8 mb-4">3. Disfruta el camino</h2>
                    <p>Una vez aprobado, coordinamos la entrega y ya estás listo para rodar con la seguridad de Glik.</p>
                </div>
            </div>
            <div className="mt-24">
                <h3 className="heading-md uppercase mb-8 text-center">Explora Categorías</h3>
                <CategoryNavigation />
            </div>
        </main>
    )
}
