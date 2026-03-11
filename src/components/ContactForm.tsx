'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'

// Definimos el esquema de validación con Zod
const contactSchema = z.object({
  fullName: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Ingrese un email válido" }),
  phone: z.string().min(8, { message: "Ingrese un teléfono válido" }),
  subject: z.string().min(1, { message: "Seleccione un asunto" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)

    // Simulamos un envío a una API
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Formulario enviado:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000)
  }

  // Clases CSS base para los inputs con estética Midnight Gold minimalista
  const inputClassName = "w-full bg-transparent border-0 border-b border-slate-700/50 py-3 text-white placeholder:text-slate-500 focus:ring-0 focus:border-accent transition-colors disabled:opacity-50 font-medium text-sm"

  return (
    <div className="bg-slate-900/50 p-6 sm:p-8 lg:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl backdrop-blur-sm">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        <h3 className="text-2xl font-black text-white mb-8">Envíenos su mensaje</h3>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-2">¡Mensaje Enviado!</h4>
            <p className="text-slate-400 text-sm md:text-base">Gracias por contactarnos. Un especialista se comunicará a la brevedad.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Full Name */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 block">Nombre Completo *</label>
                <input
                  type="text"
                  {...register("fullName")}
                  className={inputClassName}
                  placeholder="Ej. Juan Pérez"
                  disabled={isSubmitting}
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-2 font-medium absolute -bottom-5 left-0">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 block">Email *</label>
                <input
                  type="email"
                  {...register("email")}
                  className={inputClassName}
                  placeholder="ejemplo@correo.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-red-400 text-xs mt-2 font-medium absolute -bottom-5 left-0">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 block">Teléfono *</label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={inputClassName}
                  placeholder="+54 9 11 0000-0000"
                  disabled={isSubmitting}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-2 font-medium absolute -bottom-5 left-0">{errors.phone.message}</p>}
              </div>

              {/* Subject */}
              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 block">Asunto *</label>
                <select
                  {...register("subject")}
                  className={`${inputClassName} appearance-none cursor-pointer`}
                  disabled={isSubmitting}
                >
                  <option value="" disabled className="bg-slate-900 text-slate-500">Seleccione un asunto</option>
                  <option value="Comprar Propiedad" className="bg-slate-900">Comprar Propiedad</option>
                  <option value="Vender Propiedad" className="bg-slate-900">Vender Propiedad</option>
                  <option value="Alquilar Propiedad" className="bg-slate-900">Alquilar Propiedad</option>
                  <option value="Tasación" className="bg-slate-900">Tasación</option>
                  <option value="Consultas Generales" className="bg-slate-900">Consultas Generales</option>
                </select>
                {/* Custom select arrow icon */}
                <div className="absolute right-0 top-1/2 pointer-events-none text-slate-500">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {errors.subject && <p className="text-red-400 text-xs mt-2 font-medium absolute -bottom-5 left-0">{errors.subject.message}</p>}
              </div>
            </div>

            {/* Message */}
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 block">Mensaje *</label>
              <textarea
                {...register("message")}
                className={`${inputClassName} min-h-[120px] resize-y`}
                placeholder="¿En qué podemos ayudarle?"
                disabled={isSubmitting}
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-2 font-medium absolute -bottom-5 left-0">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-slate-950 hover:bg-white hover:text-slate-950 font-black tracking-wide uppercase text-sm py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group border border-transparent shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
