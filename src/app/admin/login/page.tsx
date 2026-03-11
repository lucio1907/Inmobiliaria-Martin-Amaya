'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import Logo from '@/components/Logo'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (err: any) {
      setError('Credenciales inválidas. Por favor intente de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-10">
            <Logo className="scale-125" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Área Privada</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Acceso a Gestión Inmobiliaria</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Profesional</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="usuario@tuinmobiliaria.com"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent/30 outline-none transition-all font-bold text-slate-200 placeholder:text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent/30 outline-none transition-all font-bold text-slate-200 placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20"
              >
                {error}
              </motion.p>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-accent hover:bg-white text-slate-950 font-black rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 group relative overflow-hidden active:scale-[0.98]"
            >
              <span className="relative z-10">{loading ? 'Verificando...' : 'Acceder al Panel'}</span>
              {!loading && <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-white/5" />
          <span>Seguridad Encriptada</span>
          <div className="h-px w-8 bg-white/5" />
        </div>
      </motion.div>
    </div>
  )
}
