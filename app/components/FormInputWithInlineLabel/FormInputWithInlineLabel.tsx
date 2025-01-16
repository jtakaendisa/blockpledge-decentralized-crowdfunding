import { HTMLInputTypeAttribute, useLayoutEffect, useRef } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormInputWithInlineLabel.module.scss';

interface Props<T extends FieldValues> {
  label: string;
  id: Path<T>;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegister<T>;
}

const FormInputWithInlineLabel = <T extends FieldValues>({
  label,
  id,
  type,
  placeholder,
  error,
  required,
  register,
}: Props<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLLabelElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const label = labelRef.current;

    if (container && label) {
      const bounds = label.getBoundingClientRect();

      container.style.setProperty('--label-width', `${bounds.width}px`);
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.formInput}>
      <div className={styles.mainContent}>
        <input
          id={id}
          className={styles.input}
          type={type}
          placeholder={placeholder}
          {...register(id, { required })}
        />
        <label ref={labelRef} htmlFor={id} className={styles.label}>
          {label}:
        </label>
      </div>

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormInputWithInlineLabel;
