import { ReactNode } from 'react';
import { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormSelect.module.scss';

interface Props<T extends FieldValues> {
  children: ReactNode;
  field: Path<T>;
  placeholder: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegister<T>;
}

const FormSelect = <T extends FieldValues>({
  children,
  field,
  placeholder,
  error,
  required,
  register,
}: Props<T>) => {
  return (
    <div className={styles.selectContainer}>
      <select
        {...register(field, { required })}
        className={styles.select}
        defaultValue=""
      >
        <option value="" disabled className={styles.placeholder}>
          {placeholder}
        </option>
        {children}
      </select>

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormSelect;
