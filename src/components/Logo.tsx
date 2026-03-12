'use client'

import { getSettings } from "@/app/actions/settings"
import { SiteSettings } from "@/types/settings"
import { useEffect, useState } from "react"

export default function Logo({ className = "" }: { className?: string }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])
  return (
    <div className={`text-xl md:text-2xl font-black tracking-tight text-white flex flex-col leading-none ${className}`}>
      <span className="text-accent">J.MARTIN</span>
      <span className="text-center tracking-[0.2em] text-base md:text-lg">AMAYA</span>
      <span className="text-center text-[7px] md:text-[9px] text-slate-400 font-bold tracking-widest uppercase mt-1">
        {settings?.about.professional_title || "M.P. N° 4022"}
      </span>
    </div>
  )
}
