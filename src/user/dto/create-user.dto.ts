import { z } from 'zod'

export const CreateUserDto = z
  .object({
    name: z.string()
      .min(3, { message: "Name is too short" }),
  email: z.string().email({ message: "Invalid E-mail" }),
  password: z.string()
      .min(6, { message: "Password is too short" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, {
          message: "Password must have at least one letter and one number", 
          // Password requirements:
          // Minimum of 6 characters
          // At least one uppercase or lowercase letter
          // At least one number
          // Symbols are accepted
      })
})