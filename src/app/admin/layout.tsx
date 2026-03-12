'use client'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import { Menu } from 'lucide-react'
import Logo from '@/components/Logo'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        } else {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router, pathname])

  // Gestiona el scroll del body cuando el sidebar se abre en móvil
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function in case component unmounts
    return () => { document.body.style.overflow = 'unset' }
  }, [sidebarOpen])

  // Cierra el sidebar al cambiar de ruta en móviles
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center w-full">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (pathname === '/admin/login') {
    return <main className="w-full min-h-screen bg-slate-950">{children}</main>
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-white w-full overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive positioned */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 min-h-screen w-full relative flex flex-col lg:pl-[280px]">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="scale-75 origin-left">
            <Logo />
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-xl">
            <Menu size={24} />
          </button>
        </div>

        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="p-4 sm:p-6 lg:p-8 pb-32 min-h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
