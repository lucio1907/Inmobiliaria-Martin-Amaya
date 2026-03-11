'use client'

import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function ContactSection() {
  return (
    <section id="contacto" className="pt-16 lg:pt-24 pb-16 lg:pb-24 relative overflow-hidden">
      {/* Background decorations for section */}
      <div className="absolute top-1/4 -left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-800/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom relative z-10 w-full">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4 relative inline-block">
            Contacto
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-accent/80 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
          </h2>
          <p className="text-slate-400 text-base md:text-lg font-medium mt-6 md:mt-8 px-4 md:px-0">
            Estamos a su disposición para asesorarlo. Contáctenos y un especialista se comunicará con usted a la brevedad.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-start">

          {/* Left Column: Contact Information */}
          <ScrollReveal direction="left" className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] mb-10">Información</h3>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-accent group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all duration-300">
                    <MapPin size={20} className="text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Oficina Central</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Av. Libertador 1234, Piso 5<br />
                      Buenos Aires, Argentina<br />
                      M.P. N° 4022
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-accent group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all duration-300">
                    <Phone size={20} className="text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Teléfonos</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                        +54 9 11 1234-5678 (WhatsApp)
                      </a>
                      <a href="tel:+541143218765" className="hover:text-white transition-colors block mt-1">
                        +54 11 4321-8765 (Fijo)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-accent group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all duration-300">
                    <Mail size={20} className="text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Email</h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      <a href="mailto:contacto@inmobiliariaamaya.com" className="hover:text-white transition-colors block">
                        contacto@inmobiliariaamaya.com
                      </a>
                      <a href="mailto:ventas@inmobiliariaamaya.com" className="hover:text-white transition-colors block mt-1">
                        ventas@inmobiliariaamaya.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-accent group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all duration-300">
                    <Clock size={20} className="text-accent group-hover:text-slate-950 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">Horarios</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Lunes a Viernes: 9:00 a 18:00 hs<br />
                      Sábados: 10:00 a 13:00 hs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Form */}
          <ScrollReveal direction="right" className="lg:col-span-8">
            <ContactForm />
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
