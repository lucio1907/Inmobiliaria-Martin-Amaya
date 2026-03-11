'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && (
        <>
          <div className="luxe-bg" />
          <div className="mesh-glow -top-48 -left-48 bg-slate-200" />
          <div className="mesh-glow top-1/2 -right-48 bg-slate-100" />
          <Navbar />
        </>
      )}
      
      {!isAdminRoute ? (
         <main className="pt-20 flex-grow w-full">
           {children}
         </main>
      ) : (
         <div className="w-full flex-grow bg-slate-50 text-slate-900">
           {children}
         </div>
      )}

      {!isAdminRoute && <Footer />}
    </>
  )
}
