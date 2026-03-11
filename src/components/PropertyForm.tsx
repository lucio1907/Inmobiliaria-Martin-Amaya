'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Property } from '@/types/property'
import { createProperty, updateProperty } from '@/app/actions/properties'
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
      location: { city: '', address: '' },
      features: { m2_total: 0, rooms: 0, bathrooms: 0, garage: false },
      images: [],
      public_ids: [],
      status: 'available',
      featured: false,
    }
  )

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

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.images]
      const newPublicIds = [...prev.public_ids]
      newImages.splice(index, 1)
      newPublicIds.splice(index, 1)
      return { ...prev, images: newImages, public_ids: newPublicIds }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-8">Información General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Título de la Propiedad</label>
            <input 
              type="text" 
              required
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Descripción</label>
            <textarea 
              rows={5}
              required
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Operación</label>
            <select 
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium appearance-none"
              value={formData.operation}
              onChange={(e) => setFormData(prev => ({ ...prev, operation: e.target.value as any }))}
            >
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Tipo</label>
            <select 
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium appearance-none"
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
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Precio</label>
            <div className="flex gap-2">
              <select 
                className="w-24 px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as any }))}
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
              </select>
              <input 
                type="number" 
                required
                className="flex-grow px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Slug (URL)</label>
            <input 
              type="text" 
              placeholder="ej: casa-moderna-en-nordelta"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-8">Ubicación y Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Ciudad / Barrio</label>
            <input 
              type="text" required
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
              value={formData.location.city}
              onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Dirección</label>
            <input 
              type="text" required
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
              value={formData.location.address}
              onChange={(e) => setFormData(prev => ({ ...prev, location: { ...prev.location, address: e.target.value } }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">m² Totales</label>
              <input 
                type="number" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                value={formData.features.m2_total}
                onChange={(e) => setFormData(prev => ({ ...prev, features: { ...prev.features, m2_total: Number(e.target.value) } }))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Ambientes</label>
              <input 
                type="number" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                value={formData.features.rooms}
                onChange={(e) => setFormData(prev => ({ ...prev, features: { ...prev.features, rooms: Number(e.target.value) } }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-2">Baños</label>
              <input 
                type="number" required
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                value={formData.features.bathrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, features: { ...prev.features, bathrooms: Number(e.target.value) } }))}
              />
            </div>
            <div className="flex items-end pb-4">
               <label className="flex items-center gap-3 cursor-pointer select-none">
                 <input 
                   type="checkbox"
                   className="w-6 h-6 rounded-lg border-slate-200 text-slate-900 focus:ring-slate-900"
                   checked={formData.features.garage}
                   onChange={(e) => setFormData(prev => ({ ...prev, features: { ...prev.features, garage: e.target.checked } }))}
                 />
                 <span className="font-bold text-slate-600">Tiene Cochera</span>
               </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-8">Multimedia y Visibilidad</h2>
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-tighter mb-4">Fotos de la Propiedad</label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {formData.images.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100">
                  <CldImage 
                    src={url} 
                    alt="" 
                    width={200}
                    height={200}
                    crop="fill"
                    className="w-full h-full object-cover" 
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-md">PORTADA</span>
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
                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all"
                  >
                    <ImageIcon size={32} />
                    <span className="text-xs font-bold uppercase tracking-tight">Subir Fotos</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 py-6 border-t border-slate-50">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="checkbox"
                className="w-6 h-6 rounded-lg border-slate-200 text-slate-900 focus:ring-slate-900"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              />
              <span className="font-bold text-slate-900 uppercase tracking-tighter">Propiedad Destacada</span>
            </label>

            <div className="flex items-center gap-4">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Estado:</label>
              <div className="flex bg-slate-50 p-1 rounded-xl">
                 {(['available', 'sold', 'archived'] as const).map((status) => (
                   <button
                     key={status}
                     type="button"
                     onClick={() => setFormData(prev => ({ ...prev, status }))}
                     className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                       formData.status === status ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
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

      <div className="flex justify-end gap-4 pb-12">
        <button 
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 bg-white text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          {isEditing ? 'Guardar Cambios' : 'Crear Propiedad'}
        </button>
      </div>
    </form>
  )
}
