'use server'

import { profileSchema } from './schema'
import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createProfileAction = async (prevState: any, formDData: FormData) => {
  try {
    const user = await currentUser()
    if (!user) throw new Error('Please sign in to create a profile')

    const rawData = Object.fromEntries(formDData)
    const validatedFields = profileSchema.parse(rawData)

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
    return {
      message: error instanceof Error ? error.message : 'Something went wrong',
    }
  }
  redirect('/')
}
