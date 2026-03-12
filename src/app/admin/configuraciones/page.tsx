'use client'

import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '@/app/actions/settings'
import { SiteSettings } from '@/types/settings'
import { Save, Loader2, Globe, MessageCircle, Phone, Mail, Instagram, Facebook, Linkedin, MapPin, Clock, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import SuccessModal from '@/components/admin/SuccessModal'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social'>('general')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const data = await getSettings()
    setSettings(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return
    setSaving(true)
    try {
      const result = await updateSettings(settings)
      if (result.success) {
        setShowSuccess(true)
      } else {
        alert('Error al guardar configuraciones')
      }
    } catch (error) {
      console.error(error)
      alert('Error inesperado')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!settings) return null

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Configuraciones</h1>
          <p className="text-slate-400 font-medium text-lg">Personaliza la información pública de tu inmobiliaria.</p>
        </motion.div>
        
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-accent text-slate-950 font-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(197,160,89,0.5)] disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          {saving ? <Loader2 size={20} className="animate-spin relative z-10" /> : <Save size={20} className="relative z-10" />}
          <span className="relative z-10 uppercase tracking-wider">{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs sidebar */}
        <div className="lg:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'general' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Globe size={20} /> General
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'contact' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Mail size={20} /> Contacto
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'social' ? 'bg-accent/10 text-accent border border-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Instagram size={20} /> Redes Sociales
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                <h3 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-3">
                  <MessageCircle className="text-accent" /> WhatsApp
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Número de WhatsApp (con código de país completo, sin el +)</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.whatsapp.number}
                      onChange={(e) => setSettings({...settings, whatsapp: {...settings.whatsapp, number: e.target.value.replace(/\D/g, '')}})}
                      placeholder="ej: 5491100000000"
                    />
                    <p className="text-[10px] text-slate-500 mt-2 ml-2 italic">Solo números. Ej: 5491122334455</p>
                  </div>
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-3 pt-4">
                  <Globe className="text-accent" /> Sobre Nosotros
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Resumen Footer</label>
                    <textarea 
                      rows={3}
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium resize-none"
                      value={settings.about.summary}
                      onChange={(e) => setSettings({...settings, about: {...settings.about, summary: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Matrícula / Título Profesional</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.about.professional_title}
                      onChange={(e) => setSettings({...settings, about: {...settings.about, professional_title: e.target.value}})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                <h3 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-4 flex items-center gap-3">
                  <Phone className="text-accent" /> Datos de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Mail size={12}/> Email Público</label>
                    <input 
                      type="email"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.contact.email}
                      onChange={(e) => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Phone size={12}/> Teléfono Fijo</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.contact.phone}
                      onChange={(e) => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><MapPin size={12}/> Dirección</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.contact.address}
                      onChange={(e) => setSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Globe size={12}/> Localidad/Oficina</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.contact.office}
                      onChange={(e) => setSettings({...settings, contact: {...settings.contact, office: e.target.value}})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Clock size={12}/> Horarios de Atención</label>
                    <input 
                      type="text"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.contact.schedule}
                      onChange={(e) => setSettings({...settings, contact: {...settings.contact, schedule: e.target.value}})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 space-y-8">
                <h3 className="text-xl font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">Redes Sociales</h3>
                <div className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Instagram size={12}/> Instagram URL</label>
                    <input 
                      type="url"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.social.instagram}
                      onChange={(e) => setSettings({...settings, social: {...settings.social, instagram: e.target.value}})}
                      placeholder="https://instagram.com/tuperfil"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Facebook size={12}/> Facebook URL</label>
                    <input 
                      type="url"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.social.facebook}
                      onChange={(e) => setSettings({...settings, social: {...settings.social, facebook: e.target.value}})}
                      placeholder="https://facebook.com/tupagina"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Linkedin size={12}/> LinkedIn URL</label>
                    <input 
                      type="url"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.social.linkedin}
                      onChange={(e) => setSettings({...settings, social: {...settings.social, linkedin: e.target.value}})}
                      placeholder="https://linkedin.com/in/perfil"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Music size={12}/> Tik Tok URL</label>
                    <input 
                      type="url"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                      value={settings.social.tiktok}
                      onChange={(e) => setSettings({...settings, social: {...settings.social, tiktok: e.target.value}})}
                      placeholder="https://tiktok.com/@tuperfil"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Cambios guardados"
        message="Las configuraciones del sitio han sido actualizadas correctamente y ya están visibles en la web."
      />
    </div>
  )
}
