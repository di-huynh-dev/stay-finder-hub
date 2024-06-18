import * as z from 'zod'
import { ZodSchema } from 'zod'

export const profileSchema: ZodSchema = z.object({
  firstName: z.string().min(2, { message: 'Please enter at least two characters!' }),
  lastName: z.string().min(2, { message: 'Please enter at least two characters!' }),
  username: z.string().min(2, { message: 'Please enter at least two characters!' }),
})
