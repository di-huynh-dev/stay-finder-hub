'use server'

import { imagesSchema, profileSchema, propertySchema, validateWithZodSchema } from './schema'
import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './supabase'

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be signed in to access this page')
  }
  if (!user.privateMetadata?.hasProfile) {
    redirect('/profile/create')
  }
  return user
}

export const createProfileAction = async (prevState: any, formDData: FormData) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error('Please sign in to create a profile')

    const rawData = Object.fromEntries(formDData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        phone: user.phoneNumbers[0]?.phoneNumber ?? '',
        ...validatedFields,
      },
    })
    await clerkClient.users.updateUser(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    })

    return {
      message: 'Profile created successfully',
    }
  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}

export const fetchProfileImage = async () => {
  const user = await currentUser()
  if (!user) return null
  const profile = await db.profile.findUnique({ where: { clerkId: user.id }, select: { profileImage: true } })
  return profile?.profileImage
}

export const fetchProfile = async () => {
  const user = await getAuthUser()
  const profile = await db.profile.findUnique({ where: { clerkId: user.id } })
  if (!profile) return redirect('/profile/create')
  return profile
}

export const updateProfileAction = async (prevState: any, formDData: FormData) => {
  try {
    const user = await getAuthUser()

    const rawData = Object.fromEntries(formDData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)
    await db.profile.update({ where: { clerkId: user.id }, data: validatedFields })
    revalidatePath('/profile')
    return {
      message: 'Profile updated successfully',
    }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProfileImageAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const image = formData.get('image') as File
  const user = await getAuthUser()
  try {
    const image = formData.get('image') as File
    const validatedFields = validateWithZodSchema(imagesSchema, { image })
    const fullPath = await uploadImage(validatedFields.image)
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    })
    revalidatePath('/profile')
    return { message: 'Profile image updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const createPropertyAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File

    const validatedFields = validateWithZodSchema(propertySchema, rawData)
    const validatedFile = validateWithZodSchema(imagesSchema, { image: file })
    const fullPath = await uploadImage(validatedFile.image)

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    })

    return { message: 'Property created successfully' }
  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}
