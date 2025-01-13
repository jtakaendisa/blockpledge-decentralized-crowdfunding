import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address' });

const passwordSchema = z
  .string()
  .min(7, { message: 'Password must be at least 7 characters long' })
  .max(50, { message: 'Password must not exceed 30 characters' });

const walletAddressSchema = z
  .string()
  .min(26, { message: 'Address must be at least 26 characters long' })
  .max(103, { message: 'Address must be no more than 103 characters long' })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Address must only contain alphanumeric characters',
  });

const accountTypeSchema = z.enum(['funder', 'owner'], {
  message: "Account type must be either 'funder' or 'owner'",
});

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    accountType: accountTypeSchema,
    walletAddress: walletAddressSchema.optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.',
  })
  .superRefine(({ accountType, walletAddress }, ctx) => {
    if (accountType === 'owner' && !walletAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['walletAddress'],
        message: 'Wallet address is required for account type "owner".',
      });
    }
  });
