'use client'

import { useEffect, useState } from 'react'
import { getProperties, deleteProperty } from '@/app/actions/properties'
import { Property } from '@/types/property'
import { Plus, Pencil, Trash2, ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import DeleteModal from '@/components/admin/DeleteModal'

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, propertyId: string, propertyTitle: string }>({
    isOpen: false,
    propertyId: '',
    propertyTitle: ''
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const data = await getProperties()
    setProperties(data)
    setLoading(false)
  }

  const handleDelete = async (id: string, title: string) => {
    setDeleteModal({
      isOpen: true,
      propertyId: id,
      propertyTitle: title
    })
  }

  const confirmDelete = async () => {
    if (deleteModal.propertyId) {
      await deleteProperty(deleteModal.propertyId)
      fetchProperties()
    }
  }

  if (loading) return (
    <div className="w-full h-full min-h-[60vh] flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Panel de Control</h1>
          <p className="text-slate-400 font-medium text-lg">Gestiona tu catálogo de propiedades y exclusivas.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link 
            href="/admin/nueva" 
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-slate-950 font-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(197,160,89,0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <Plus size={22} className="relative z-10" />
            <span className="relative z-10 uppercase tracking-wider">Nueva Propiedad</span>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-[2.5rem] blur-xl -z-10" />
        
        <div className="bg-slate-900/50 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-1.5 sm:p-2">
          <div className="overflow-x-auto rounded-[1rem] sm:rounded-[2rem] bg-slate-950/50">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500 bg-white/[0.02]">Propiedad</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500 bg-white/[0.02]">Estado</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500 bg-white/[0.02]">Precio</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-500 bg-white/[0.02] text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {properties.map((p, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (i * 0.05) }}
                    key={p.id} 
                    className="group hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-800 shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                          ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-700">No Img</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div>
                          <span className="block font-black text-white text-lg group-hover:text-accent transition-colors duration-300">{p.title}</span>
                          <span className="text-sm text-slate-400 font-medium">{p.location.city}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <span className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-lg border ${
                           p.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-white/5'
                         }`}>
                           {p.status === 'available' ? 'Disponible' : p.status}
                         </span>
                         {p.featured && (
                           <div className="p-1.5 bg-accent/10 rounded-full border border-accent/20">
                             <Star size={14} className="text-accent fill-accent" />
                           </div>
                         )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-white text-lg">{p.currency} {p.price.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/propiedades/${p.slug}`} target="_blank" className="p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                          <ExternalLink size={18} />
                        </Link>
                        <Link href={`/admin/editar/${p.id}`} className="p-3 bg-white/5 text-slate-400 hover:text-accent hover:bg-accent/10 hover:border-accent/20 rounded-xl transition-all duration-300">
                          <Pencil size={18} />
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.title)} className="p-3 bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 rounded-xl transition-all duration-300">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {properties.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-500 font-medium">
                      No hay propiedades registradas. ¡Agrega la primera!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <DeleteModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        title={deleteModal.propertyTitle}
      />
    </div>
  )
}
