'use server'

import { adminDb } from '@/lib/firebase-admin'
import { SiteSettings } from '@/types/settings'
import { revalidatePath } from 'next/cache'

const COLLECTION_NAME = 'settings'
const DOC_ID = 'site'

const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp: {
    number: '5491112345678'
  },
  contact: {
    email: 'info@martin-amaya.com',
    address: 'Av. Libertador 1234, Piso 5',
    office: 'Buenos Aires, Argentina',
    phone: '+54 11 4321-8765',
    schedule: 'Lunes a Viernes: 9:00 a 18:00 hs'
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    tiktok: 'https://tiktok.com'
  },
  about: {
    summary: 'Tu Inmobiliaria de Confianza M.P. N° 4022. Ofrecemos un servicio premium y personalizado.',
    professional_title: 'M.P. N° 4022'
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const doc = await adminDb.collection(COLLECTION_NAME).doc(DOC_ID).get()
    if (!doc.exists) {
      return DEFAULT_SETTINGS
    }
    return doc.data() as SiteSettings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return DEFAULT_SETTINGS
  }
}

export async function updateSettings(data: SiteSettings) {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(DOC_ID).set(data, { merge: true })
    revalidatePath('/')
    revalidatePath('/propiedades')
    revalidatePath('/admin/configuraciones')
    return { success: true }
  } catch (error) {
    console.error('Error updating settings:', error)
    return { success: false, error: 'Failed to update settings' }
  }
}
