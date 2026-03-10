import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import footerLinks from "@/data/footerLinks"

export function Footer() {
  return (
    <footer className="bg-[#1b103c] text-white pt-24 pb-12 overflow-hidden relative" data-testid="footer">
      <div className="container px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand & Newsletter Column */}
          <div className="flex flex-col gap-8">
            <LocalizedClientLink href="/">
              <Image
                src="/logo-glik.png"
                width={120}
                height={34}
                alt="Glik Motos Logo"
                className="brightness-0 invert object-contain"
              />
            </LocalizedClientLink>
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#00d4aa]">Suscríbete a ofertas</h3>
              <p className="text-sm text-gray-400">Recibe las últimas novedades y promociones exclusivas en tu correo.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="tu@email.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#ec7b15] outline-none flex-1" />
                <button className="bg-[#ec7b15] hover:bg-[#d66a0e] text-white px-4 py-3 rounded-lg font-bold text-xs uppercase transition-all shadow-lg">Unirme</button>
              </div>
            </div>
          </div>

          {/* Customer Services Column */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#00d4aa] mb-8">Servicios</h2>
            <nav className="flex flex-col gap-4">
              {footerLinks.customerServices.map(({ label, path }) => (
                <LocalizedClientLink
                  key={label}
                  href={path}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ec7b15] opacity-0 group-hover:opacity-100 transition-all"></span>
                  {label}
                </LocalizedClientLink>
              ))}
            </nav>
          </div>

          {/* About Column */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#00d4aa] mb-8">Empresa</h2>
            <nav className="flex flex-col gap-4">
              {footerLinks.about.map(({ label, path }) => (
                <LocalizedClientLink
                  key={label}
                  href={path}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </LocalizedClientLink>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#00d4aa] mb-8">Contacto</h2>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <a href="tel:+56912345678" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ec7b15] transition-all">📞</div>
                  +56 9 1234 5678
                </a>
                <a href="mailto:hola@glik.cl" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ec7b15] transition-all">✉️</div>
                  hola@glik.cl
                </a>
                <a href="https://wa.me/56912345678" target="_blank" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#00d4aa] transition-all">💬</div>
                  Chat WhatsApp
                </a>
              </div>
              <div className="flex gap-4 pt-4">
                {footerLinks.connect.map(({ label, path }) => (
                  <a
                    key={label}
                    href={path}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#ec7b15] transition-all text-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label === 'Facebook' && 'f'}
                    {label === 'Instagram' && 'i'}
                    {label === 'LinkedIn' && 'l'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-12 border-y border-white/5 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00d4aa]">Pagos Seguros</span>
              <span className="text-[9px] text-gray-500 uppercase">Encriptación SSL 256-bit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00d4aa]">Comprador Protegido</span>
              <span className="text-[9px] text-gray-500 uppercase">Garantía Glik de 12 meses</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00d4aa]">+4.9/5 Calificación</span>
              <span className="text-[9px] text-gray-500 uppercase">1.2k Motoristas felices</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">© 2026 Glik Motos - El Marketplace Nº1 de Motocicletas en Chile.</p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <LocalizedClientLink href="/privacy-policy" className="hover:text-white transition-colors">Privacidad</LocalizedClientLink>
            <LocalizedClientLink href="/terms-and-conditions" className="hover:text-white transition-colors">Términos</LocalizedClientLink>
            <LocalizedClientLink href="/cookies" className="hover:text-white transition-colors">Cookies</LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* FIXED WHATSAPP BUTTON */}
      <a
        href="https://wa.me/56912345678"
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] bg-[#00d4aa] text-[#1b103c] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,212,170,0.4)] hover:scale-110 transition-all group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -left-32 bg-[#1b103c] text-white text-[10px] font-black px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none uppercase tracking-widest border border-white/10">
          ¿Necesitas ayuda?
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </footer>
  )
}
