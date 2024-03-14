'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import styles from './page.module.scss';

interface SigninFormInputs {
  email: string;
  password: string;
  accountType: string;
  wallet: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitSuccessful },
  } = useForm<SigninFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      accountType: 'funder',
      wallet: '',
    },
  });

  const watchShowWallet = watch('accountType');

  const onSubmit: SubmitHandler<SigninFormInputs> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={styles.signupPage}>
      <Header />
      <section>
        <div className={styles.card}>
          <h2 className={styles.heading}>Create Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
              />
            </div>
            <fieldset>
              <legend>Select an account type:</legend>

              <div>
                <label htmlFor="funder">Project Funder</label>
                <input
                  id="funder"
                  type="radio"
                  value="funder"
                  {...register('accountType')}
                />
              </div>

              <div>
                <label htmlFor="owner">Project Owner</label>
                <input
                  id="owner"
                  type="radio"
                  value="owner"
                  {...register('accountType')}
                />
              </div>
            </fieldset>
            {watchShowWallet === 'owner' && (
              <div>
                <label htmlFor="wallet">Crypto Wallet</label>
                <input
                  id="wallet"
                  type="text"
                  {...register('wallet', { required: true })}
                />
              </div>
            )}
            <Button>Sign Up</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
