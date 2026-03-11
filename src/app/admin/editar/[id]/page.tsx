import PropertyForm from "@/components/PropertyForm";
import { adminDb } from "@/lib/firebase-admin";
import { Property } from "@/types/property";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await adminDb.collection('properties').doc(id).get();
  
  if (!doc.exists) notFound();
  
  const data = doc.data();
  const property = { 
    id: doc.id, 
    ...data,
    createdAt: data?.createdAt?.toDate?.()?.toISOString() || new Date(data?.createdAt).toISOString(),
  } as Property;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">Editar Propiedad</h1>
        <p className="text-slate-400 font-medium text-base md:text-lg">Modifica los datos de la propiedad seleccionada.</p>
      </div>
      <PropertyForm initialData={property} isEditing />
    </div>
  )
}
