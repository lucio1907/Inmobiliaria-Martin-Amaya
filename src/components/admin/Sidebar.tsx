'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { LayoutDashboard, PlusCircle, Settings, LogOut, Home, X } from 'lucide-react'
import Logo from '@/components/Logo'
import { motion } from 'framer-motion'

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  const links = [
    { href: '/admin', label: 'Panel', icon: LayoutDashboard },
    { href: '/admin/nueva', label: 'Nueva Propiedad', icon: PlusCircle },
    { href: '/admin/configuraciones', label: 'Configuraciones', icon: Settings },
  ]

  return (
    <aside className="w-[280px] bg-slate-950/80 backdrop-blur-2xl text-white h-[100dvh] border-r border-white/10 flex flex-col relative z-20 shrink-0">
      {/* Sidebar background effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between lg:justify-center">
        <div className="scale-90 origin-left">
          <Logo />
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-colors">
            <X size={20} />
          </button>
        )}
      </div>
      <div className="p-4 md:p-6 flex-grow flex flex-col gap-2 overflow-y-auto">
        <h3 className="text-xs font-black uppercase tracking-widest pl-4 mb-2 text-slate-500 mt-2">Menú</h3>
        {links.map((link, i) => {
          const active = pathname === link.href || (link.href !== '/admin' && pathname?.startsWith(link.href))
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href} onClick={onClose} className="relative group">
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${active ? 'text-accent font-bold shadow-[0_0_20px_rgba(197,160,89,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
                }`}>
                <Icon size={22} className={active ? 'text-accent' : 'text-slate-500 group-hover:text-white transition-colors duration-300'} />
                {link.label}
              </div>
            </Link>
          )
        })}
      </div>
      <div className="p-4 md:p-6 border-t border-white/5 flex flex-col gap-2">
        <Link href="/" onClick={onClose} className="flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl font-medium transition-all duration-300 group">
          <Home size={22} className="text-slate-500 group-hover:text-white transition-colors duration-300" />
          Ir a la Web
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3.5 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-2xl font-medium transition-all duration-300 group">
          <LogOut size={22} className="text-slate-500 group-hover:text-red-400 transition-colors duration-300" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
