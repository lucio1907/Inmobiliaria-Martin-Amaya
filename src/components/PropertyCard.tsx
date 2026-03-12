'use client'

import { Property } from '@/types/property'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, Square, ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <ScrollReveal 
      distance={30}
      className="group card-premium h-full flex flex-col overflow-hidden"
    >
      <Link href={`/propiedades/${property.slug}`} className="relative block overflow-hidden">
        {property.images?.[0] ? (
          <CldImage
            src={property.images[0]}
            alt={property.title}
            width={600}
            height={450}
            crop="fill"
            gravity="auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-property transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="aspect-property bg-white/5 flex items-center justify-center border-b border-white/5">
            <span className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Sin imagen</span>
          </div>
        )}
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-4">
          <span className={cn(
            "px-2 py-1 md:px-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-lg text-white backdrop-blur-md border border-white/20",
            property.operation === 'Venta' ? "bg-slate-900/80" : "bg-blue-600/80"
          )}>
            {property.operation}
          </span>
          {property.featured && (
            <span className="px-2 py-1 md:px-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-lg bg-accent text-slate-950 shadow-lg shadow-accent/20">
              Destacada
            </span>
          )}
        </div>
      </Link>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <Link href={`/propiedades/${property.slug}`} className="block mb-3">
          <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 text-slate-400 text-xs md:text-sm mb-6">
          <MapPin className="text-accent/50 w-4 h-4 md:w-4 md:h-4 shrink-0" />
          <span className="truncate font-medium">
            {property.location.address ? `${property.location.address}, ${property.location.city}` : property.location.city}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 py-5 md:py-6 border-y border-white/5 mb-6">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <BedDouble className="text-slate-500 group-hover:text-accent/60 transition-colors w-5 h-5 md:w-5 md:h-5 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider md:tracking-widest">{property.features.rooms} Amb.</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Bath className="text-slate-500 group-hover:text-accent/60 transition-colors w-5 h-5 md:w-5 md:h-5 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider md:tracking-widest">{property.features.bathrooms} Baños</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Square className="text-slate-500 group-hover:text-accent/60 transition-colors w-5 h-5 md:w-5 md:h-5 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider md:tracking-widest">{property.features.m2_total} m²</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex-grow">
            <span className="block text-[9px] md:text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mb-1">Precio</span>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-xs md:text-sm font-bold text-accent/60">{property.currency}</span>
              <span className="text-2xl md:text-3xl font-black text-white break-all">
                {new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(property.price)}
              </span>
            </div>
          </div>
          
          <Link 
            href={`/propiedades/${property.slug}`}
            className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-white transition-all hover:bg-accent hover:text-slate-950 hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] group/btn"
          >
            <ArrowRight className="transition-transform group-hover/btn:translate-x-1 w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  )
}
