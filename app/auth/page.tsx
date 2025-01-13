'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { z } from 'zod';

import { signInSchema } from '../validationSchemas';
import { signInAuthUser } from '../services/authService';
import useFormHandler from '../hooks/useFormHandler';
import Button from '../components/Button/Button';

import styles from './page.module.scss';

type SignInFormData = z.infer<typeof signInSchema>;

const AuthPage = () => {
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);

  const { errors, register, handleSubmit } = useFormHandler({
    schema: signInSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const { email, password } = data;

    setAuthError(null);

    try {
      await signInAuthUser(email, password);
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

  return (
    <div className={styles.authPage}>
      <section>
        <div className={styles.card}>
          <h2 className={styles.heading}>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                {...register('email', { required: true })}
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            <div className={styles.formInput}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
              />
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}

            {authError && <p className={styles.error}>{authError}</p>}
            <div className={styles.buttonContainer}>
              <Button>Sign In</Button>
            </div>
          </form>
          <span className={styles.redirectLink}>
            Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
          </span>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
