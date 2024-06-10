import { z } from 'zod'

export const UpdateUserDto = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is too short" })
      .optional(),
  email: z.
      string()
      .email({ message: "Invalid E-mail" })
      .optional(),
  password: z
      .string()
      .min(6, { message: "Password is too short" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, {
          message: "Password must have at least one letter and one number"
      })
      .optional()
})