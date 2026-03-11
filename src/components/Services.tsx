'use client'

import { motion } from 'framer-motion'
import { Home, Calculator, Briefcase, Key, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

const services = [
  {
    title: 'Venta y Alquiler',
    description: 'Comercialización de propiedades exclusivas con alcance internacional.',
    icon: Home,
    link: '/#contacto'
  },
  {
    title: 'Tasaciones',
    description: 'Valoración precisa basada en análisis de mercado actualizados.',
    icon: Calculator,
    link: '/#contacto'
  },
  {
    title: 'Inversiones',
    description: 'Asesoramiento estratégico para maximizar la rentabilidad de su capital.',
    icon: Briefcase,
    link: '/#contacto'
  },
  {
    title: 'Administración',
    description: 'Gestión integral de alquileres para propietarios exigentes.',
    icon: Key,
    link: '/#contacto'
  }
]

export default function Services() {
  return (
    <section id="servicios" className="pt-8 pb-16 md:pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-custom relative z-10 w-full">
        <div className="mb-10 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tighter"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1 w-16 md:w-24 bg-accent rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction="up"
              className="group p-5 md:p-8 lg:p-10 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_50px_-10px_rgba(197,160,89,0.1)] flex flex-col sm:flex-row items-start gap-4 md:gap-6 lg:gap-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-slate-950 transition-all duration-500 shrink-0 shadow-lg border border-white/5">
                <service.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{service.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  {service.description}
                </p>
                <Link 
                  href={service.link}
                  className="inline-flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-accent/60 group-hover:text-accent transition-colors pt-2"
                >
                  Saber más
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

