import * as z from 'zod'
import { ZodSchema } from 'zod'

export const profileSchema: ZodSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters!' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters!' }),
  username: z.string().min(2, { message: 'Username must be at least 2 characters!' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters!' })
    .max(12, { message: 'Phone number must be at most 12 characters!' }),
})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)
    throw new Error(errors.join(', '))
  }
  return result.data
}

export const imagesSchema = z.object({
  image: validateFile(),
})

function validateFile() {
  const maxUploadSize = 1024 * 1024
  const acceptedFileTypes = ['image/']
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
    }, 'File must be an image')
}
