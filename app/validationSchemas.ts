import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address' });

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 7 characters long' })
  .max(50, { message: 'Password must not exceed 30 characters' });

export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
