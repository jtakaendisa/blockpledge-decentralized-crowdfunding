'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { z } from 'zod';

import { signUpSchema } from '@/app/validationSchemas';
import { createAuthUser, createUserDocument } from '@/app/services/authService';
import useFormHandler from '@/app/hooks/useFormHandler';
import Button from '../../components/Button/Button';

import styles from './page.module.scss';

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignupPage = () => {
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);

  const { errors, register, watch, handleSubmit } = useFormHandler({
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

  return (
    <div className={styles.signupPage}>
      <section>
        <div className={styles.card}>
          <h2 className={styles.heading}>Create Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
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
            <div className={styles.formInput}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { required: true })}
              />
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
            <fieldset className={styles.formFieldset}>
              <legend>Select an account type:</legend>

              <div className={styles.formOption}>
                <label htmlFor="funder">Project Funder</label>
                <input
                  id="funder"
                  type="radio"
                  value="funder"
                  {...register('accountType')}
                />
              </div>

              <div className={styles.formOption}>
                <label htmlFor="owner">Project Owner</label>
                <input
                  id="owner"
                  type="radio"
                  value="owner"
                  {...register('accountType')}
                />
              </div>
            </fieldset>
            {errors.accountType && (
              <p className={styles.error}>{errors.accountType.message}</p>
            )}

            {watchAccountType === 'owner' && (
              <>
                <div className={styles.formInput}>
                  <label htmlFor="walletAddress">Crypto Wallet</label>
                  <input
                    id="walletAddress"
                    type="text"
                    {...register('walletAddress', { required: true })}
                  />
                </div>
                {errors.walletAddress && (
                  <p className={styles.error}>{errors.walletAddress.message}</p>
                )}
              </>
            )}

            {authError && <p className={styles.error}>{authError}</p>}
            <div className={styles.buttonContainer}>
              <Button>Sign Up</Button>
            </div>
          </form>
          <span className={styles.redirectLink}>
            Already have an account? <Link href="/auth">Sign in</Link>
          </span>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
