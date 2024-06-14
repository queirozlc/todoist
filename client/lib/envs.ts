import { z } from 'zod'

const envrionmentsSchema = z.object({
  API_URL: z.string().url()
})

export const env = envrionmentsSchema.parse(process.env)
