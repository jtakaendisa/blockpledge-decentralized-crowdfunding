'use client';

import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useSignupPage } from '@/app/hooks/useSignupPage';
import Form from '@/app/components/form/Form/Form';
import FormHeading from '@/app/components/form/FormHeading/FormHeading';
import FormInputWithLabel from '@/app/components/form/FormInputWithLabel/FormInputWithLabel';
import FormFieldsetWithLegend from '@/app/components/form/FormFieldsetWithLegend/FormFieldsetWithLegend';
import FormRadioWithLabel from '@/app/components/form/FormRadioWithLabel/FormRadioWithLabel';
import FormRedirectLink from '@/app/components/form/FormRedirectLink/FormRedirectLink';
import FormErrorMessage from '@/app/components/form/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '@/app/components/form/FormSubmitButton/FormSubmitButton';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';

import styles from './page.module.scss';

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
      <Form onSubmit={handleFormSubmit} width={400}>
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
            <FormRadioWithLabel
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

        <FormSubmitButton>Sign Up</FormSubmitButton>
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
