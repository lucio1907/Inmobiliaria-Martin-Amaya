'use server'

import { adminDb } from '@/lib/firebase-admin'
import { Property } from '@/types/property'
import { revalidatePath } from 'next/cache'

const COLLECTION_NAME = 'properties'

export async function getProperties(filters?: Partial<{
  type: string;
  operation: string;
  minPrice: number;
  maxPrice: number;
  featured: boolean;
}>) {
  try {
    let query: any = adminDb.collection(COLLECTION_NAME);

    if (filters?.type && filters.type !== 'all') {
      query = query.where('type', '==', filters.type);
    }
    if (filters?.operation && filters.operation !== 'all') {
      query = query.where('operation', '==', filters.operation);
    }
    if (filters?.featured) {
      query = query.where('featured', '==', true);
    }
    if (filters?.minPrice) {
      query = query.where('price', '>=', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.where('price', '<=', filters.maxPrice);
    }

    const snapshot = await query.get();
    let properties = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date(data.createdAt).toISOString(),
      };
    }) as Property[];

    // Manual sort to avoid composite index requirement for now
    properties.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getPropertyBySlug(slug: string) {
  if (!slug) return null;
  try {
    const snapshot = await adminDb.collection(COLLECTION_NAME).where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date(data.createdAt).toISOString(),
    } as Property;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
}

export async function createProperty(data: Omit<Property, 'id' | 'createdAt'>) {
  try {
    const docRef = await adminDb.collection(COLLECTION_NAME).add({
      ...data,
      createdAt: new Date(),
    });
    revalidatePath('/');
    revalidatePath('/propiedades');
    revalidatePath('/admin');
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating property:', error);
    return { success: false, error: 'Failed to create property' };
  }
}

export async function updateProperty(id: string, data: Partial<Property>) {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).update(data);
    revalidatePath('/');
    revalidatePath('/propiedades');
    revalidatePath(`/propiedades/${data.slug || id}`);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error updating property:', error);
    return { success: false, error: 'Failed to update property' };
  }
}

export async function deleteProperty(id: string) {
  try {
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath('/');
    revalidatePath('/propiedades');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    return { success: false, error: 'Failed to delete property' };
  }
}
