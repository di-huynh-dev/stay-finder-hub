'use server'

import { profileSchema } from './schema'

export const createProfileAction = async (prevState: any, formDData: FormData) => {
  try {
    const rawData = Object.fromEntries(formDData)
    const validatedFields = profileSchema.parse(rawData)
    console.log(validatedFields)
    return {
      message: 'Profile created successfully',
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Something went wrong',
    }
  }
}
