'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function BentoGallery({ images, title }: { images: string[], title: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    return () => { 
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [selectedImage])

  if (!images || images.length === 0) return (
    <div className="aspect-video bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center">
      <span className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">Sin imágenes disponibles</span>
    </div>
  )

  const showMore = images.length > 5
  const displayImages = images.slice(0, 5)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedImage((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
  }

  return (
    <>
      <div className={cn(
        "grid gap-2 md:gap-4",
        images.length === 1 && "grid-cols-1",
        images.length === 2 && "grid-cols-1 md:grid-cols-2 auto-rows-[250px] md:auto-rows-[400px]",
        images.length >= 3 && "grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[300px]"
      )}>
        {displayImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => openLightbox(i)}
            className={cn(
              "relative rounded-xl md:rounded-2xl overflow-hidden border border-white/5 shadow-xl md:shadow-2xl transition-all duration-500 cursor-pointer group",
              images.length === 1 && "aspect-video md:aspect-[21/9]",
              images.length >= 3 && i === 0 && "col-span-2 row-span-2",
              images.length === 3 && i > 0 && "col-span-1 md:col-span-2 row-span-1",
              images.length === 4 && i === 1 && "col-span-1 md:col-span-2 row-span-1",
              images.length === 4 && i > 1 && "col-span-1 row-span-1",
              images.length >= 5 && i > 0 && "col-span-1 row-span-1"
            )}
          >
            <CldImage
              src={img}
              alt={`${title} - Imagen ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={i === 0 ? "(max-width: 768px) 100vw, 1000px" : "(max-width: 768px) 50vw, 500px"}
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 transition-transform duration-500 w-6 h-6 md:w-8 md:h-8" />
            </div>

            {i === 4 && showMore && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white pointer-events-none border border-accent/20">
                <span className="text-3xl md:text-5xl font-black text-accent leading-none">+{images.length - 5}</span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-1 md:mt-2">Fotos</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-all z-50 bg-slate-900/50 hover:bg-slate-900 p-3 rounded-full backdrop-blur-md border border-white/10"
            >
              <X size={28} className="md:w-8 md:h-8" />
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-white/5 p-4 rounded-full backdrop-blur-md"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 bg-white/5 p-4 rounded-full backdrop-blur-md"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <CldImage
                src={images[selectedImage]}
                alt={`${title} - Vista completa`}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium py-4">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
