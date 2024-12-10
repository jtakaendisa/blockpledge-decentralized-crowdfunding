'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { signInAuthUser } from '../services/authService';
import Header from '../components/TopNav/TopNav';
import Button from '../components/Button/Button';

import styles from './page.module.scss';

interface SigninFormInputs {
  email: string;
  password: string;
}

const AuthPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<SigninFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    const { email, password } = data;

    try {
      await signInAuthUser(email, password);
      router.push('/');
    } catch (error) {
      console.log('error encountered during sign in', (error as Error).message);
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={styles.authPage}>
      <Header />
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
            <div className={styles.formInput}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button>Sign In</Button>
            </div>
          </form>
          <span className={styles.signup}>
            Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
          </span>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
