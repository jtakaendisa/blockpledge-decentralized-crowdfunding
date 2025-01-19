import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormFieldsetWithLegend.module.scss';

interface Props {
  children: ReactNode;
  legend: string;
  error?: FieldError;
}

const FormFieldsetWithLegend = ({ children, legend, error }: Props) => {
  return (
    <fieldset className={styles.formFieldset}>
      <legend className={styles.legend}>{legend}</legend>
      {children}

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </fieldset>
  );
};

export default FormFieldsetWithLegend;
