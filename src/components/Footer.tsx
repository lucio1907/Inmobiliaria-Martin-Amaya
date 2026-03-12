'use client'

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, Music } from "lucide-react"
import Logo from '@/components/Logo'
import { useScroll } from "@/hooks/useScroll"
import { getSettings } from "@/app/actions/settings"
import { useEffect, useState } from "react"
import { SiteSettings } from "@/types/settings"

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { handleScrollToSection } = useScroll();
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/10 mt-12 md:mt-20">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12 md:mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              href="/"
              onClick={(e) => handleScrollToSection(e, '/')}
              className="inline-block"
            >
              <Logo />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {settings?.about.summary || "Tu Inmobiliaria de Confianza M.P. N° 4022. Ofrecemos un servicio premium y personalizado para encontrar la propiedad de tus sueños."}
            </p>
            <div className="flex items-center gap-4">
              <a href={settings?.social.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-slate-950 transition-all shadow-lg border border-white/5 hover:border-accent/50">
                <Instagram size={18} />
              </a>
              <a href={settings?.social.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-slate-950 transition-all shadow-lg border border-white/5 hover:border-accent/50">
                <Facebook size={18} />
              </a>
              <a href={settings?.social.tiktok || "https://tiktok.com"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-slate-950 transition-all shadow-lg border border-white/5 hover:border-accent/50">
                <Music size={18} />
              </a>
              <a href={settings?.social.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-slate-950 transition-all shadow-lg border border-white/5 hover:border-accent/50">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-6 text-sm">Navegación</h4>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Propiedades', path: '/#propiedades' },
                { name: 'Servicios', path: '/#servicios' },
                { name: 'Nosotros', path: '/#nosotros' },
                { name: 'Contacto', path: '/#contacto' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={link.path.startsWith('/#') ? (e) => handleScrollToSection(e, link.path.substring(1)) : undefined}
                    className="group flex items-center gap-2 text-slate-400 hover:text-accent transition-colors text-sm font-medium"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-6 text-sm">Destacados</h4>
            <ul className="space-y-4">
              {[
                { name: 'Casas en Venta', path: '/propiedades?type=Casa&operation=Venta' },
                { name: 'Departamentos', path: '/propiedades?type=Departamento' },
                { name: 'Alquileres', path: '/propiedades?operation=Alquiler' },
                { name: 'Lotes y Terrenos', path: '/propiedades?type=Lote' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-accent transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] mb-6 text-sm">Contacto</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-sm text-slate-400 font-medium">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>
                  {settings?.contact.office || "Oficina Central"}<br />
                  {settings?.contact.address || "Buenos Aires, Argentina"}
                </span>
              </li>
              <li className="flex items-center gap-4 text-sm text-slate-400 font-medium group">
                <Phone size={18} className="text-accent shrink-0" />
                <a href={`https://wa.me/${settings?.whatsapp.number || '5491112345678'}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {settings?.contact.phone || "+54 9 11 1234-5678"}
                </a>
              </li>
              <li className="flex items-center gap-4 text-sm text-slate-400 font-medium group">
                <Mail size={18} className="text-accent shrink-0" />
                <a href={`mailto:${settings?.contact.email || "info@martin-amaya.com"}`} className="hover:text-white transition-colors">
                  {settings?.contact.email || "info@martin-amaya.com"}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium text-center md:text-left order-2 md:order-1">
            &copy; {currentYear} J. Martin Amaya Inmobiliaria. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs font-medium order-1 md:order-2">
            <Link href="/privacidad" className="text-slate-500 hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-slate-500 hover:text-white transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
