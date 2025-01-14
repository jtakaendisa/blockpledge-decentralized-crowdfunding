'use client';

import { Fragment } from 'react';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';

import { accountTypeSchema, signUpSchema } from '@/app/validationSchemas';
import { useSignupPage } from '@/app/hooks/useSignupPage';
import Form from '@/app/components/Form/Form';
import FormHeading from '@/app/components/FormHeading/FormHeading';
import FormInputWithLabel from '@/app/components/FormInputWithLabel/FormInputWithLabel';
import FormFieldsetWithLegend from '@/app/components/FormFieldsetWithLegend/FormFieldsetWithLegend';
import FormRadioWithLabel from '@/app/components/FormRadioWithLabel/FormRadioWithLabel';
import FormRedirectLink from '@/app/components/FormRedirectLink/FormRedirectLink';
import FormErrorMessage from '@/app/components/FormErrorMessage/FormErrorMessage';
import FlipButton from '@/app/components/FlipButton/FlipButton';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';

import styles from './page.module.scss';

type SignUpFormData = z.infer<typeof signUpSchema>;

type AccountType = z.infer<typeof accountTypeSchema>;

const fields = [
  { label: 'Email', id: 'email', type: 'email' },
  { label: 'Password', id: 'password', type: 'password' },
  { label: 'Confirm Password', id: 'confirmPassword', type: 'password' },
] as const;

const radioOptions = [
  { label: 'Funder', id: 'funder' },
  { label: 'Owner', id: 'owner' },
] as const;

const SignupPage = () => {
  const { fieldErrors, authError, watchAccountType, register, handleFormSubmit } =
    useSignupPage();

  return (
    <div className={styles.signupPage}>
      <Form onSubmit={handleFormSubmit} width="400px">
        <FormHeading>Create Account</FormHeading>
        <VerticalSpacer height={20} />

        {fields.map(({ label, id, type }) => (
          <Fragment key={id}>
            <FormInputWithLabel
              label={label}
              id={id}
              type={type}
              error={fieldErrors[id]}
              register={register}
              required
            />
            <VerticalSpacer />
          </Fragment>
        ))}

        <FormFieldsetWithLegend legend="Account Type" error={fieldErrors.accountType}>
          {radioOptions.map(({ label, id }) => (
            <FormRadioWithLabel<SignUpFormData, AccountType>
              key={id}
              label={label}
              id={id}
              field="accountType"
              register={register}
            />
          ))}
        </FormFieldsetWithLegend>
        <VerticalSpacer />

        {watchAccountType === 'owner' && (
          <>
            <FormInputWithLabel
              label="Wallet Address"
              id="walletAddress"
              type="text"
              error={fieldErrors.walletAddress}
              register={register}
            />
            <VerticalSpacer />
          </>
        )}

        <AnimatePresence>
          {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
        </AnimatePresence>
        <VerticalSpacer />

        <div className={styles.buttonContainer}>
          <FlipButton backgroundColor1="transparent">Sign Up</FlipButton>
        </div>
        <VerticalSpacer />

        <FormRedirectLink
          message="Already have an account?"
          href="/auth"
          linkText="Sign in"
        />
      </Form>
    </div>
  );
};

export default SignupPage;
