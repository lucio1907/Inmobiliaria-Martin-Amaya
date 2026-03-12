'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { getSettings } from '@/app/actions/settings'
import { useEffect, useState } from 'react'
import { SiteSettings } from '@/types/settings'

export default function AboutUs() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])
  return (
    <section id="nosotros" className="pt-8 pb-16 md:pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <ScrollReveal direction="left" className="space-y-4 md:space-y-6">
             <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Trayectoria Inmobiliaria</span>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1]">
              Construyendo <br className="hidden md:block"/>
              Confianza de <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                Generación en Generación
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              {settings?.about.summary || `En J. Martin Amaya Inmobiliaria, no solo vendemos propiedades; <strong className="text-white">construimos relaciones a largo plazo</strong>. Nuestro equipo de profesionales altamente cualificados (${settings?.about.professional_title || "M.P. N° 4022"}) se dedica a ofrecer un servicio premium y personalizado, guiándote en cada paso de tu inversión inmobiliaria.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-accent mb-2 md:mb-3">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="text-white font-black text-sm md:text-base">Experiencia</h4>
                <p className="text-slate-500 text-[10px] md:text-xs font-medium">Conocimiento profundo del mercado local premium.</p>
              </div>
               <div className="space-y-1">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-accent mb-2 md:mb-3">
                  <Star className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="text-white font-black text-sm md:text-base">Exclusividad</h4>
                <p className="text-slate-500 text-[10px] md:text-xs font-medium">Acceso prioritario a las mejores de propiedades.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="relative mt-6 lg:mt-0 w-full max-w-sm md:max-w-md lg:max-w-full mx-auto">
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-square md:aspect-[4/5] lg:aspect-square bg-slate-900 border border-white/10 shadow-2xl group mx-4 md:mx-0">
               {/* Asymmetric placeholder design mimicking a modern architecture shot */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-0 right-0 w-full h-1/2 bg-accent/10 backdrop-blur-3xl" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10 text-center pointer-events-none">
                <Users className="text-accent/40 mb-3 md:mb-6 w-10 h-10 md:w-14 md:h-14" />
                <h3 className="text-lg md:text-xl font-black text-white mb-2 text-balance">El Equipo Perfecto</h3>
                 <p className="text-slate-400 font-medium text-xs md:text-sm max-w-xs text-balance">Asesores dedicados permanentemente a entender y materializar tu visión inmobiliaria.</p>
              </div>
            </div>
            
             {/* Floating badge */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="absolute -bottom-6 -left-2 sm:-left-6 md:-bottom-12 md:-left-12 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl max-w-[240px] md:max-w-[280px]"
             >
               <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 md:mb-2 tracking-tighter">
                 {settings?.about.professional_title.replace(/[^0-9]/g, '') || "4022"}
               </div>
               <div className="text-[8px] md:text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-1">Matrícula Profesional</div>
               <p className="text-slate-400 text-[10px] md:text-xs font-medium leading-relaxed">Garantía de legitimidad y seguridad en cada operación.</p>
             </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
