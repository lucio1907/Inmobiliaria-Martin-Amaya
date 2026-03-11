'use client'

import { useState } from 'react'
import { Search, Home, Building2, Map, LayoutGrid, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROPERTY_TYPES = [
  { id: 'all', label: 'Todo', icon: LayoutGrid },
  { id: 'Casa', label: 'Casas', icon: Home },
  { id: 'Depto', label: 'Deptos', icon: Building2 },
  { id: 'Lote', label: 'Lotes', icon: Map },
]

export default function SearchHero() {
  const [activeType, setActiveType] = useState('all')

  return (
    <section id="home" className="relative pb-12 lg:pt-32 lg:pb-12 overflow-hidden flex min-h-[90vh] md:min-h-0 items-center w-full">
      {/* Mesh gradients for the Hero area */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-accent/10 rounded-full blur-[100px] md:blur-[160px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-slate-800/20 rounded-full blur-[80px] md:blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Columna Izquierda: Texto y Buscador */}
          <div className="max-w-3xl flex flex-col gap-6 lg:gap-8 mt-8 lg:mt-0">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 lg:mb-8"
              >
                <Star size={12} className="fill-accent md:w-[14px] md:h-[14px]" />
                Agencia Inmobiliaria Premium
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 lg:mb-6 leading-[1.05]"
              >
                El hogar que <br /> <span className="text-accent underline decoration-white/10 underline-offset-4 lg:underline-offset-8">imaginas, hoy.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed font-medium max-w-xl"
              >
                Descubre nuestra selección exclusiva de propiedades diseñadas para elevar tu estilo de vida.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-slate-900/60 backdrop-blur-3xl p-3 border border-white/5 rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col items-stretch gap-3 w-full"
            >
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-1 p-2 bg-slate-950/50 rounded-xl lg:rounded-2xl border border-white/5 w-full">
                {PROPERTY_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveType(type.id)}
                      className={cn(
                        "flex flex-1 justify-center items-center gap-1 sm:gap-2 px-2 py-2.5 sm:px-4 sm:py-3 rounded-lg lg:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider md:tracking-widest transition-all whitespace-nowrap min-w-[70px]",
                        activeType === type.id
                          ? "bg-accent text-slate-950 shadow-2xl shadow-accent/20"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                      <span>{type.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/30 rounded-xl lg:rounded-2xl p-2 border border-white/5">
                <div className="flex-grow flex items-center px-4 py-2 sm:py-0">
                  <Search className="text-accent/40 mr-3 shrink-0" size={18} />
                  <input
                    type="text"
                    placeholder="¿Qué ubicación buscas?"
                    className="w-full bg-transparent border-none focus:outline-none text-white font-bold placeholder:text-slate-600 text-sm md:text-base py-1"
                  />
                </div>
                <button className="bg-white text-slate-950 px-8 py-3.5 lg:py-4 rounded-lg lg:rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-accent hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] active:scale-95 shrink-0 w-full sm:w-auto">
                  Buscar
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex items-center justify-center lg:justify-start gap-6 lg:gap-8 pt-4 border-t border-white/5"
            >
              <div>
                <p className="text-2xl lg:text-3xl font-black text-white">+500</p>
                <p className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase tracking-wider">Propiedades</p>
              </div>
              <div className="w-px h-8 lg:h-10 bg-white/10" />
              <div>
                <p className="text-2xl lg:text-3xl font-black text-white">+10k</p>
                <p className="text-[10px] lg:text-xs text-slate-500 font-bold uppercase tracking-wider">Clientes Felices</p>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha: Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block max-w-[420px] xl:max-w-[480px] w-full mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[2.5rem] blur-2xl transform -rotate-6 scale-105" />
            <div className="relative aspect-[4/5] rounded-[2.5rem] xl:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/hero-home.png"
                alt="Propiedad de lujo moderna"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              {/* Overlay gradiente suave para que no quede tan plana la imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Elemento flotante decorativo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 xl:-bottom-8 xl:-left-8 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 xl:p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Home className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs xl:text-sm font-bold text-white">Excelente Servicio</p>
                  <div className="flex gap-1 text-accent mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

