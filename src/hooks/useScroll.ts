'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function useScroll() {
  const router = useRouter()
  const pathname = usePathname()

  // Listener para cuando montamos la web habiendo entrado con un hash URL (ej: /#servicios desde /contacto)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
         const element = document.getElementById(window.location.hash.substring(1))
         if (element) {
           const headerOffset = 96
           const elementPosition = element.getBoundingClientRect().top
           const offsetPosition = elementPosition + window.scrollY - headerOffset
           
           window.scrollTo({
             top: offsetPosition,
             behavior: 'smooth'
           })
         }
      }, 500)
    }
  }, [pathname])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    e.preventDefault()

    if (!targetPath.includes('#')) {
      if (pathname !== targetPath) {
        router.push(targetPath)
      } else if (targetPath === '/') {
        // Clear the hash in the URL and scroll to top
        if (window.location.hash) {
          window.history.pushState(null, '', '/')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const [pathPart, hashPart] = targetPath.split('#')
    const destinationPath = pathPart || '/'
    
    if (pathname === destinationPath) {
      const element = document.getElementById(hashPart)
      if (element) {
        const headerOffset = 96
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        
        // Push the hash to the URL quietly for history tracking
        window.history.pushState(null, '', `#${hashPart}`)
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      router.push(`${destinationPath}#${hashPart}`)
    }
  }

  return { handleScrollToSection }
}
