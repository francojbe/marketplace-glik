export default function ContactoPage() {
    return (
        <main className="container py-24 min-h-[70vh]">
            <div className="max-w-3xl mx-auto shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100 bg-white">
                <div className="bg-[#1b103c] p-12 text-white">
                    <h1 className="text-4xl font-black mb-4 uppercase italic">
                        Contáctanos
                    </h1>
                    <p className="opacity-80">Nuestro equipo de expertos motorizados está listo para ayudarte.</p>
                </div>

                <div className="p-12">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nombre</label>
                                <input type="text" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#ec7b15]" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                                <input type="email" className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#ec7b15]" placeholder="hola@ejemplo.com" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Asunto</label>
                            <select className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#ec7b15]">
                                <option>Quiero comprar una moto</option>
                                <option>Quiero vender mi moto</option>
                                <option>Consulta de financiamiento</option>
                                <option>Soporte técnico</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Mensaje</label>
                            <textarea rows={5} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#ec7b15]" placeholder="Escribe aquí tu mensaje..."></textarea>
                        </div>

                        <button type="button" className="w-full bg-[#ec7b15] text-white py-5 rounded-2xl font-black uppercase tracking-[2px] shadow-lg hover:shadow-xl transition-all">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
