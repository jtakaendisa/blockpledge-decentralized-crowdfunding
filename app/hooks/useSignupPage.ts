import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { FirebaseError } from 'firebase/app';

import { signUpSchema } from '../validationSchemas';
import { createAuthUser, createUserDocument } from '../services/authService';
import { useFormHandler } from './useFormHandler';

type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignupPage = () => {
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    errors: fieldErrors,
    register,
    watch,
    handleSubmit,
  } = useFormHandler({
    schema: signUpSchema,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'funder',
      walletAddress: '',
    },
  });

  const watchAccountType = watch('accountType');

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { email, password, accountType, walletAddress } = data;

    setAuthError(null);

    try {
      const response = await createAuthUser(email, password);

      if (response) {
        await createUserDocument(response.user, accountType, walletAddress);
        router.push('/');
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setAuthError(
              'This email address is already registered. Please log in or use a different email.'
            );
            break;
          default:
            setAuthError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return handleSubmit(onSubmit)();
  };

  return { fieldErrors, authError, watchAccountType, register, handleFormSubmit };
};
