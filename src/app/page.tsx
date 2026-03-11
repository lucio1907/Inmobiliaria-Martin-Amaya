import SearchHero from "@/components/SearchHero";
import PropertyCard from "@/components/PropertyCard";
import Services from "@/components/Services";
import { getProperties } from "@/app/actions/properties";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AboutUs from "@/components/AboutUs";
import ContactSection from "@/components/ContactSection";

export const revalidate = 3600; // revalidate at most every hour

export default async function Home() {
  const featuredProperties = await getProperties({ featured: true });

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      <SearchHero />
      <section id="propiedades" className="container-custom pt-4 md:pt-10">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-12">
          <div>
            <span className="block text-[10px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-accent/60 mb-2 md:mb-3">Selección Exclusiva</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight">Propiedades Destacadas</h2>
          </div>
          <Link
            href="/propiedades"
            className="group flex items-center gap-2 md:gap-3 text-accent font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all hover:text-white mt-2 md:mt-0"
          >
            Ver catálogo completo
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-2 w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </ScrollReveal>

        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center border border-white/5 border-dashed">
            <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-widest">No hay propiedades destacadas en este momento.</p>
          </div>
        )}
      </section>

      <Services />

      <AboutUs />

      <section className="container-custom flex justify-center py-10 md:py-16">
        <ScrollReveal
          className="bg-slate-900 w-full max-w-5xl rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16 relative overflow-hidden border border-white/5 shadow-2xl"
          duration={1.2}
          distance={60}
        >
          {/* Subtle glow inside the CTA */}
          <div className="absolute -top-16 -right-16 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-[1.1] md:leading-[1] tracking-tighter">¿Buscas vender o alquilar?</h2>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed font-medium">
              Obtén una tasación profesional y descubre cómo podemos ayudarte a encontrar al comprador ideal con nuestra estrategia de marketing premium.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-accent text-slate-950 font-black text-sm md:text-base rounded-xl md:rounded-2xl hover:bg-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] active:scale-95 group"
            >
              Contactar ahora
              <ArrowRight className="transition-transform group-hover:translate-x-1 w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800/20 to-transparent pointer-events-none" />
        </ScrollReveal>
      </section>

      <ContactSection />
    </div>
  );
}
