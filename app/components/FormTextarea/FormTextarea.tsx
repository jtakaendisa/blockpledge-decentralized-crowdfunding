import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormTextarea.module.scss';

interface Props<T extends FieldValues> {
  field: Path<T>;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<T>;
}

const FormTextarea = <T extends FieldValues>({
  field,
  placeholder,
  error,
  required,
  register,
}: Props<T>) => {
  return (
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textArea}
        placeholder={placeholder}
        rows={5}
        {...register(field, { required })}
      />

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormTextarea;
