import { z } from 'zod';

import { getFutureDate } from './utils';

export const emailSchema = z.string().email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(7, { message: 'Password must be at least 7 characters long' })
  .max(50, { message: 'Password must not exceed 30 characters' });

export const walletAddressSchema = z
  .string()
  .min(26, { message: 'Address must be at least 26 characters long' })
  .max(103, { message: 'Address must be no more than 103 characters long' })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: 'Address must only contain alphanumeric characters',
  });

export const accountTypeSchema = z.enum(['funder', 'owner'], {
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
    walletAddress: z.string().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })
  .superRefine(({ accountType, walletAddress }, ctx) => {
    if (accountType === 'owner') {
      if (!walletAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['walletAddress'],
          message: 'Wallet address is required for account type "owner"',
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

export const titleSchema = z
  .string()
  .min(2, { message: 'Title must be at least 2 characters long' })
  .max(50, { message: 'Title must not exceed 50 characters' });

export const costSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    return parseFloat(val);
  }
  return val;
}, z.number().positive({ message: 'Cost must be a positive number' })) as z.ZodEffects<
  z.ZodNumber,
  number,
  number
>;

// Derived date bounds for expiresAtSchema
const minDate = getFutureDate(1);
const maxDate = getFutureDate(1, 'years');

export const expiresAtSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' })
  .refine(
    (val) => {
      const date = new Date(val);

      return date >= minDate && date <= maxDate;
    },
    {
      message: `Date must be between ${minDate.toISOString().split('T')[0]} and ${
        maxDate.toISOString().split('T')[0]
      }`,
    }
  );

export const imagesSchema = z
  .array(
    z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Only image files are allowed',
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'Each image must be less than 5MB',
      })
  )
  .min(1, { message: 'At least 1 image is required' })
  .max(3, { message: 'You can upload up to 3 images' });

export const categoryIdSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    return parseInt(val, 10);
  }
  return val;
}, z.number().int().nonnegative({ message: 'Category must be a non-negative integer' })) as z.ZodEffects<
  z.ZodNumber,
  number,
  number
>;

export const descriptionSchema = z
  .string()
  .refine((val) => val.trim().split(/\s+/).length >= 5, {
    message: 'Description must be at least 5 words',
  })
  .refine((val) => val.trim().split(/\s+/).length <= 100, {
    message: 'Description must be no more than 100 words',
  });

export const createProjectSchema = z.object({
  title: titleSchema,
  cost: costSchema,
  expiresAt: expiresAtSchema,
  categoryId: categoryIdSchema,
  images: imagesSchema,
  description: descriptionSchema,
});

export const decisionSchema = z.enum(['accept', 'reject'], {
  message: "Decision must be either 'accept' or 'reject'",
});

export const reasonSchema = z
  .string()
  .refine((val) => val.trim().split(/\s+/).length >= 2, {
    message: 'Reason must be at least 2 words',
  })
  .refine((val) => val.trim().split(/\s+/).length <= 200, {
    message: 'Reason must be no more than 200 words',
  });

export const authorizeProjectSchema = z
  .object({
    decision: decisionSchema,
    reason: z.string().optional(),
  })
  .superRefine(({ decision, reason }, ctx) => {
    if (decision === 'reject') {
      if (!reason) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['reason'],
          message: 'Reason is required',
        });
      } else {
        const reasonValidation = reasonSchema.safeParse(reason);

        if (!reasonValidation.success) {
          reasonValidation.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['reason'],
            });
          });
        }
      }
    }
  });
