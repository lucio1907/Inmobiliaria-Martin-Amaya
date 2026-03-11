import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Nueva Propiedad</h1>
        <p className="text-slate-500 font-medium">Completa los datos para publicar una nueva propiedad</p>
      </div>
      <PropertyForm />
    </div>
  )
}
