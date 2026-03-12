'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Background Flair */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] -z-10" />
            
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                  <AlertTriangle className="text-red-500" size={28} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                  ¿Eliminar propiedad?
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Estás a punto de eliminar <span className="text-white font-bold">{title}</span>. Esta acción no se puede deshacer y borrará también todas las imágenes asociadas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-white/5 text-slate-300 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all text-center"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onConfirm()
                    onClose()
                  }}
                  className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Confirmar Borrado
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
