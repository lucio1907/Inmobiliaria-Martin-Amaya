'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { getProperties, deleteProperty } from '@/app/actions/properties'
import { Property } from '@/types/property'
import { Plus, Pencil, Trash2, LogOut, ExternalLink, Star } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push('/admin/login')
      } else {
        setUser(u)
        fetchProperties()
      }
    })
    return () => unsubscribe()
  }, [router])

  const fetchProperties = async () => {
    const data = await getProperties()
    setProperties(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Seguro quieres eliminar esta propiedad?')) {
      await deleteProperty(id)
      fetchProperties()
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  if (loading) return (
    <div className="container-custom py-20 flex justify-center">
      <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Panel de Control</h1>
          <p className="text-slate-500 font-medium">Gestiona tu catálogo de propiedades</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/nueva" 
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            <Plus size={20} />
            Nueva Propiedad
          </Link>
          <button 
            onClick={handleLogout}
            className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-slate-400">Propiedad</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-slate-400">Estado</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-slate-400">Precio</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-slate-400 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} className="w-16 h-12 rounded-lg object-cover" alt="" />
                      ) : (
                        <div className="w-16 h-12 bg-slate-100 rounded-lg" />
                      )}
                      <div>
                        <span className="block font-bold text-slate-900">{p.title}</span>
                        <span className="text-xs text-slate-400 font-medium">{p.location.city}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className={`px-3 py-1 text-xs font-bold rounded-lg ${
                         p.status === 'available' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                       }`}>
                         {p.status === 'available' ? 'Disponible' : p.status}
                       </span>
                       {p.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900">{p.currency} {p.price.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/propiedades/${p.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <ExternalLink size={18} />
                      </Link>
                      <Link href={`/admin/editar/${p.id}`} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
