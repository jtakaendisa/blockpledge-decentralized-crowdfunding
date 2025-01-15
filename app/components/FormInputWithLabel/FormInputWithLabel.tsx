import { HTMLInputTypeAttribute } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormInputWithLabel.module.scss';

interface Props<T extends FieldValues> {
  label?: string;
  id: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegister<T>;
}

const FormInputWithLabel = <T extends FieldValues>({
  label,
  id,
  type,
  placeholder = '',
  error,
  required,
  register,
}: Props<T>) => {
  return (
    <div className={styles.formInput}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
      />

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormInputWithLabel;
