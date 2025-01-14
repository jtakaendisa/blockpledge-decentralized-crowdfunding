import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'Invalid email address.' });

export const passwordSchema = z
  .string()
  .min(7, { message: 'Password must be at least 7 characters long.' })
  .max(50, { message: 'Password must not exceed 30 characters.' });

export const walletAddressSchema = z
  .string()
  .min(26, { message: 'Address must be at least 26 characters long.' })
  .max(103, { message: 'Address must be no more than 103 characters long.' })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Address must only contain alphanumeric characters.',
  });

export const accountTypeSchema = z.enum(['funder', 'owner'], {
  message: "Account type must be either 'funder' or 'owner.'",
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
    walletAddress: z.string().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.',
  })
  .superRefine(({ accountType, walletAddress }, ctx) => {
    if (accountType === 'owner') {
      if (!walletAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['walletAddress'],
          message: 'Wallet address is required for account type "owner".',
        });
      } else {
        const walletAddressValidation = walletAddressSchema.safeParse(walletAddress);
        if (!walletAddressValidation.success) {
          walletAddressValidation.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['walletAddress'],
            });
          });
        }
      }
    }
  });
