import { getProperties } from "@/app/actions/properties";
import PropertyCard from "@/components/PropertyCard";
import SearchHero from "@/components/SearchHero";
import { SkeletonGrid } from "@/components/SkeletonLoader";
import { Suspense } from "react";

export const metadata = {
  title: "Propiedades | Amaya",
  description: "Explora nuestro catálogo completo de casas, departamentos y terrenos de lujo.",
};

export const revalidate = 3600; // revalidate at most every hour

async function PropertiesList({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const properties = await getProperties({
    type: params.type,
    operation: params.operation,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  if (properties.length === 0) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center border border-white/5 shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tighter">No se encontraron resultados</h3>
        <p className="text-slate-400 max-w-md mx-auto text-base md:text-lg font-medium">Prueba ajustando tus filtros de búsqueda para encontrar lo que necesitas.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  return (
    <div className="flex flex-col pb-20">
      {/* Header Area */}
      <div className="bg-slate-950 pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
        <div className="container-custom relative z-10 text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-8 tracking-tighter leading-none">Propiedades</h1>
          <p className="text-slate-400 text-lg md:text-xl lg:text-2xl max-w-2xl font-medium leading-relaxed">
            Explora nuestro catálogo exclusivo y encuentra la propiedad que siempre soñaste.
          </p>
        </div>
      </div>

      {/* Grid Area */}
      <div className="container-custom relative z-20 mt-4 md:mt-8">
        {/* We could add horizontal filters here in the future */}
        <Suspense fallback={<SkeletonGrid count={6} />}>
          <PropertiesList searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
