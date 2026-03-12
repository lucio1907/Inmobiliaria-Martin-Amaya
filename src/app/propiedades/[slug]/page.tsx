import { getPropertyBySlug, getProperties } from "@/app/actions/properties";
import { getSettings } from '@/app/actions/settings'
import BentoGallery from "@/components/BentoGallery";
import { MapPin, BedDouble, Bath, Square, Car, CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 3600; // revalidate at most every hour

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Propiedad no encontrada" };

  return {
    title: `${property.title} | Amaya`,
    description: property.description.substring(0, 160),
    openGraph: {
      images: [property.images?.[0] || ""],
    },
  };
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug)
  const settings = await getSettings()
  
  if (!property) return notFound()

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);

  // WhatsApp Message
  const waNumber = settings.whatsapp.number || "5491112345678"
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const waMessage = `🏡 *Consulta Inmobiliaria - Martin Amaya*

📍 *${property.title}*
🔗 Ver ficha: ${siteUrl}/propiedades/${property.slug}

Hola! Me interesa obtener más información sobre esta propiedad. ¿Podrían brindarme más detalles o coordinar una visita? Muchas gracias.`

  const whatsappMessage = encodeURIComponent(waMessage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/propiedades/${property.slug}`,
    "image": property.images?.[0] || "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location.city,
      "streetAddress": property.location.address,
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": property.currency,
      "availability": property.status === 'available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    }
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-slate-950 pt-32 pb-16 md:pb-24 -mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />
        <div className="container-custom relative z-10">
          <Link
            href="/propiedades"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 rounded-xl transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver al catálogo
          </Link>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8">
            <div className="max-w-4xl text-left">
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg md:rounded-xl border border-white/10">
                  {property.operation}
                </span>
                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-md text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg md:rounded-xl border border-white/10">
                  {property.type}
                </span>
                {property.featured && (
                  <span className="px-3 md:px-4 py-1.5 md:py-2 bg-accent text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg md:rounded-xl shadow-lg shadow-accent/20">
                    Destacada
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-8 leading-[1.1] md:leading-[1] tracking-tighter">{property.title}</h1>
              <div className="flex items-center gap-2 md:gap-3 text-slate-400 text-base md:text-lg lg:text-2xl font-medium">
                <MapPin className="text-accent/60 shrink-0 w-5 h-5 md:w-7 md:h-7" />
                <span>
                  {property.location.address ? `${property.location.address}, ${property.location.city}` : property.location.city}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-1 md:gap-3 mt-4 lg:mt-0 w-full lg:w-auto">
              <span className="text-[10px] md:text-xs uppercase font-black text-accent/60 tracking-[0.3em]">Inversión</span>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white flex items-baseline gap-2 md:gap-3 flex-wrap">
                <span className="text-xl sm:text-2xl md:text-3xl text-accent font-bold">{property.currency}</span>
                <span className="break-all">{new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(property.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-10">
        <BentoGallery images={property.images} title={property.title} />
      </section>

      <section className="container-custom pt-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-20">
            <div>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Descripción</h2>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <div className="prose prose-invert prose-xl max-w-none text-slate-400 leading-relaxed font-medium">
                {property.description}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Detalles Técnicos</h2>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: Square, label: 'Superficie', value: `${property.features.m2_total} m²`, show: true },
                  { icon: BedDouble, label: 'Ambientes', value: property.features.rooms, show: property.type !== 'Lote' },
                  { icon: Bath, label: 'Baños', value: property.features.bathrooms, show: property.type !== 'Lote' },
                  { icon: Car, label: 'Cochera', value: property.features.garage ? 'Sí' : 'No', show: property.type !== 'Lote' },
                  { icon: MapPin, label: 'Frente', value: `${property.features.dimensions?.front} m`, show: property.type === 'Lote' && property.features.dimensions?.front },
                  { icon: MapPin, label: 'Fondo', value: `${property.features.dimensions?.depth} m`, show: property.type === 'Lote' && property.features.dimensions?.depth }
                ].filter(item => item.show).map((item, i) => (
                  <div key={i} className="bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group hover:border-accent/30 transition-all duration-500">
                    <item.icon className="text-slate-600 group-hover:text-accent mb-3 md:mb-5 transition-colors w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1 md:mb-2">{item.label}</span>
                    <span className="text-xl md:text-2xl font-black text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Ubicación</h2>
                <div className="h-px flex-grow bg-white/5" />
              </div>
              <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl h-[300px] md:h-[450px] relative group">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(property.location.coordinates || `${property.location.address}, ${property.location.city}`)}`}
                ></iframe>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-28 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">

              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/10 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-[1.1] tracking-tighter">
                ¿Te interesa?
              </h3>

              <p className="text-slate-400 mb-8 md:mb-10 text-base md:text-lg leading-relaxed font-medium">
                Ponte en contacto con nuestros asesores para coordinar una visita o recibir más detalles.
              </p>

              <div className="w-full space-y-4 mb-8 md:mb-10 text-left">
                <div className="flex items-center gap-4 text-slate-300 font-bold text-xs md:text-sm bg-white/5 py-4 px-5 rounded-xl md:rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Trato personal y confidencial</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300 font-bold text-xs md:text-sm bg-white/5 py-4 px-5 rounded-xl md:rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Asesoramiento premium en todo momento</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${waNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 md:py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg md:text-xl rounded-2xl md:rounded-[2rem] transition-colors"
              >
                <span className="tracking-wide">Hablar por WhatsApp</span>
              </a>

            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
