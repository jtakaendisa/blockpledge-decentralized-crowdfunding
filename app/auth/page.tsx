'use client';

import { AnimatePresence } from 'framer-motion';

import { useAuthPage } from '../hooks/useAuthPage';
import Form from '../components/Form/Form';
import FormHeading from '../components/FormHeading/FormHeading';
import FormInputWithLabel from '../components/FormInputWithLabel/FormInputWithLabel';
import FormErrorMessage from '../components/FormErrorMessage/FormErrorMessage';
import FormRedirectLink from '../components/FormRedirectLink/FormRedirectLink';
import FlipButton from '../components/FlipButton/FlipButton';
import VerticalSpacer from '../components/VerticalSpacer/VerticalSpacer';

import styles from './page.module.scss';

const AuthPage = () => {
  const { fieldErrors, authError, register, handleSubmit, onSubmit } = useAuthPage();

  const fields = [
    { label: 'Email', id: 'email', type: 'text' },
    { label: 'Password', id: 'password', type: 'password' },
  ] as const;

  return (
    <div className={styles.authPage}>
      <Form onSubmit={handleSubmit(onSubmit)} width="400px">
        <FormHeading>Sign In</FormHeading>
        <VerticalSpacer />

        {fields.map(({ label, id, type }) => (
          <div key={id}>
            <FormInputWithLabel
              label={label}
              id={id}
              type={type}
              error={fieldErrors[id]}
              register={register}
            />
            <VerticalSpacer />
          </div>
        ))}

        <AnimatePresence>
          {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
        </AnimatePresence>

        <div className={styles.buttonContainer}>
          <FlipButton backgroundColor1="transparent">Sign In</FlipButton>
        </div>
        <VerticalSpacer />

        <FormRedirectLink
          message="Don't have an account?"
          href="/auth/signup"
          linkText="Sign up"
        />
      </Form>
    </div>
  );
};

export default AuthPage;
