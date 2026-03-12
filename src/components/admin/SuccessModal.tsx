'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

export default function SuccessModal({ isOpen, onClose, title, message }: SuccessModalProps) {
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -z-10" />
            
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-500" size={28} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-10 text-left">
                <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                  {title}
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
