import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { FirebaseError } from 'firebase/app';

import { signInSchema } from '../validationSchemas';
import { signInAuthUser } from '../services/authService';
import useFormHandler from './useFormHandler';

type SignInFormData = z.infer<typeof signInSchema>;

export const useAuthPage = () => {
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    errors: fieldErrors,
    register,
    handleSubmit,
  } = useFormHandler({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setAuthError(null);
    try {
      await signInAuthUser(data.email, data.password);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            setAuthError('Incorrect email or password.');
            break;
          default:
            setAuthError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  return { fieldErrors, authError, register, handleSubmit, onSubmit };
};
