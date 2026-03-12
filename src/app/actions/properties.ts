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
  location: string;
  q: string;
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
    if (filters?.location) {
      // Keep legacy support but favor 'q' if provided
      query = query.where('location.city', '>=', filters.location)
                   .where('location.city', '<=', filters.location + '\uf8ff');
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

    // Fuzzy search / Keyword filtering (in-memory)
    if (filters?.q) {
      const searchTerm = filters.q.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.location.city.toLowerCase().includes(searchTerm) ||
        p.location.address.toLowerCase().includes(searchTerm)
      );
    }

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
    // 1. Fetch property to get public_ids
    const doc = await adminDb.collection(COLLECTION_NAME).doc(id).get();
    const data = doc.data() as Property | undefined;

    // 2. Delete images from Cloudinary if they exist
    if (data?.public_ids && data.public_ids.length > 0) {
      const { deleteCloudinaryImage } = await import('./cloudinary');
      await Promise.all(
        data.public_ids.map(publicId => deleteCloudinaryImage(publicId))
      );
    }

    // 3. Delete from Firestore
    await adminDb.collection(COLLECTION_NAME).doc(id).delete();
    
    revalidatePath('/');
    revalidatePath('/propiedades');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting property and its images:', error);
    return { success: false, error: 'Failed to delete property' };
  }
}
