'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Property } from '@/types/property'
import { createProperty, updateProperty } from '@/app/actions/properties'
import { deleteCloudinaryImage } from '@/app/actions/cloudinary'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'

export default function PropertyForm({ initialData, isEditing = false }: { initialData?: Property, isEditing?: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<Property, 'id' | 'createdAt'>>(
    initialData || {
      slug: '',
      title: '',
      description: '',
      price: 0,
      currency: 'USD',
      operation: 'Venta',
      type: 'Casa',
      location: { city: '', address: '', coordinates: '' },
      features: { 
        m2_total: 0, 
        rooms: 0, 
        bathrooms: 0, 
        garage: false,
        dimensions: { front: 0, depth: 0 }
      },
      images: [],
      public_ids: [],
      status: 'available',
      featured: false,
    }
  )

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title) {
      const suggestedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug: suggestedSlug }));
    }
  }, [formData.title, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Auto-generate slug if empty
    const finalData = { ...formData }
    if (!finalData.slug) {
      finalData.slug = finalData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    }

    try {
      if (isEditing && initialData?.id) {
        await updateProperty(initialData.id, finalData)
      } else {
        await createProperty(finalData)
      }
      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Error al guardar la propiedad')
    } finally {
      setLoading(false)
    }
  }

  const removeImage = async (index: number) => {
    const publicId = formData.public_ids[index]
    
    // Optimistic UI update
    setFormData(prev => {
      const newImages = [...prev.images]
      const newPublicIds = [...prev.public_ids]
      newImages.splice(index, 1)
      newPublicIds.splice(index, 1)
      return { ...prev, images: newImages, public_ids: newPublicIds }
    })

    // Background delete from Cloudinary
    if (publicId) {
      try {
        await deleteCloudinaryImage(publicId)
      } catch (error) {
        console.error('Error background deleting image:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="bg-slate-900/50 backdrop-blur-2xl p-6 md:p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <h2 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-4">Información General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Título de la Propiedad</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Descripción</label>
            <textarea 
              rows={5}
              required
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium resize-none"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Operación</label>
            <select 
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium appearance-none"
              value={formData.operation}
              onChange={(e) => setFormData(prev => ({ ...prev, operation: e.target.value as any }))}
            >
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tipo</label>
            <select 
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium appearance-none"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
            >
              <option value="Casa">Casa</option>
              <option value="Depto">Departamento</option>
              <option value="Lote">Lote/Terreno</option>
              <option value="Local">Local Comercial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Precio</label>
            <div className="flex gap-3">
              <select 
                className="w-28 px-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as any }))}
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
              </select>
              <input 
                type="number" 
                required
                className="flex-grow px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                value={formData.price === 0 ? '' : formData.price}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  setFormData(prev => ({ ...prev, price: val }));
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Slug (URL)</label>
            <input 
              type="text" 
              placeholder="ej: casa-moderna-en-nordelta"
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium placeholder:text-slate-600"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-2xl p-6 md:p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
        <h2 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-4">Ubicación y Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Ciudad / Barrio</label>
            <input 
              type="text" required
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
              value={formData.location.city}
              onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              {formData.type === 'Lote' ? 'Coordenadas' : 'Dirección'}
            </label>
            <input 
              type="text" required
              className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
              placeholder={formData.type === 'Lote' ? 'ej: -34.8656, -58.5355' : 'ej: Calle Falsa 123'}
              value={formData.type === 'Lote' ? (formData.location.coordinates || '') : formData.location.address}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                location: { 
                  ...prev.location, 
                  [formData.type === 'Lote' ? 'coordinates' : 'address']: e.target.value 
                } 
              }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">m² Totales</label>
              <input 
                type="number" required
                className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                value={formData.features.m2_total === 0 ? '' : formData.features.m2_total}
                onChange={(e) => {
                  const val = e.target.value === '' ? 0 : Number(e.target.value);
                  setFormData(prev => ({ ...prev, features: { ...prev.features, m2_total: val } }));
                }}
              />
            </div>
            {formData.type === 'Lote' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Frente (m)</label>
                  <input 
                    type="number"
                    className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                    value={formData.features.dimensions?.front === 0 ? '' : formData.features.dimensions?.front}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setFormData(prev => ({ 
                        ...prev, 
                        features: { 
                          ...prev.features, 
                          dimensions: { ...prev.features.dimensions!, front: val } 
                        } 
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Fondo (m)</label>
                  <input 
                    type="number"
                    className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                    value={formData.features.dimensions?.depth === 0 ? '' : formData.features.dimensions?.depth}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setFormData(prev => ({ 
                        ...prev, 
                        features: { 
                          ...prev.features, 
                          dimensions: { ...prev.features.dimensions!, depth: val } 
                        } 
                      }));
                    }}
                  />
                </div>
              </div>
            )}
            {formData.type !== 'Lote' && (
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Ambientes</label>
                <input 
                  type="number" required
                  className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                  value={formData.features.rooms === 0 ? '' : formData.features.rooms}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    setFormData(prev => ({ ...prev, features: { ...prev.features, rooms: val } }));
                  }}
                />
              </div>
            )}
          </div>
          {formData.type !== 'Lote' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Baños</label>
                <input 
                  type="number" required
                  className="w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent text-white transition-all font-medium"
                  value={formData.features.bathrooms === 0 ? '' : formData.features.bathrooms}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    setFormData(prev => ({ ...prev, features: { ...prev.features, bathrooms: val } }));
                  }}
                />
              </div>
              <div className="flex items-center pt-6">
                 <label className="flex items-center gap-4 cursor-pointer select-none group">
                   <div className="relative flex items-center justify-center">
                     <input 
                       type="checkbox"
                       className="peer w-6 h-6 rounded border-white/20 bg-slate-950/50 text-accent focus:ring-accent focus:ring-offset-slate-900 transition-colors cursor-pointer appearance-none checked:bg-accent checked:border-accent border-2"
                       checked={formData.features.garage}
                       onChange={(e) => setFormData(prev => ({ ...prev, features: { ...prev.features, garage: e.target.checked } }))}
                     />
                     <svg className="absolute w-4 h-4 text-slate-950 pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                     </svg>
                   </div>
                   <span className="font-bold text-slate-300 group-hover:text-white transition-colors">Tiene Cochera</span>
                 </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-2xl p-6 md:p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
        <h2 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-4">Multimedia y Visibilidad</h2>
        <div className="space-y-10">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Fotos de la Propiedad</label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {formData.images.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10 shadow-lg">
                  <CldImage 
                    src={url} 
                    alt="" 
                    width={200}
                    height={200}
                    crop="fill"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-400 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                  {i === 0 && (
                     <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-accent text-slate-950 text-[10px] font-black tracking-widest rounded-lg shadow-lg">PORTADA</span>
                  )}
                </div>
              ))}
              
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, result.info.secure_url],
                    public_ids: [...prev.public_ids, result.info.public_id]
                  }))
                }}
              >
                {({ open }) => (
                  <button 
                    type="button" 
                    onClick={() => open()}
                    className="aspect-square rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all group"
                  >
                    <ImageIcon size={32} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Subir Fotos</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/5">
            <label className="flex items-center gap-4 cursor-pointer select-none group">
               <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox"
                    className="peer w-6 h-6 rounded border-white/20 bg-slate-950/50 text-accent focus:ring-accent focus:ring-offset-slate-900 transition-colors cursor-pointer appearance-none checked:bg-accent checked:border-accent border-2"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                 <svg className="absolute w-4 h-4 text-slate-950 pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                 </svg>
               </div>
               <span className="font-black text-white uppercase tracking-widest">Propiedad Destacada</span>
            </label>

            <div className="flex items-center gap-6">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado:</label>
              <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-white/5">
                 {(['available', 'sold', 'archived'] as const).map((status) => (
                   <button
                     key={status}
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, status }))}
                     className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                       formData.status === status ? 'bg-accent text-slate-950 shadow-[0_0_20px_rgba(197,160,89,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                     }`}
                   >
                     {status === 'available' ? 'Disponible' : status === 'sold' ? 'Vendido' : 'Archivado'}
                   </button>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pb-12">
        <button 
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 bg-white/5 text-slate-300 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto text-center"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="group relative px-12 py-4 bg-accent text-slate-950 font-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(197,160,89,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto disabled:opacity-50 disabled:pointer-events-none"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          {loading && <Loader2 className="animate-spin relative z-10" size={20} />}
          <span className="relative z-10 tracking-wide uppercase">{isEditing ? 'Guardar Cambios' : 'Crear Propiedad'}</span>
        </button>
      </div>
    </form>
  )
}
