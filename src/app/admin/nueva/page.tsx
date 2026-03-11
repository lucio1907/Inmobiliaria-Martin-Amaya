import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Nueva Propiedad</h1>
        <p className="text-slate-400 font-medium text-base md:text-lg">Completa los datos para publicar una nueva propiedad en el catálogo.</p>
      </div>
      <PropertyForm />
    </div>
  )
}
