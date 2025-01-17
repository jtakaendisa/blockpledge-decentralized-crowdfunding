import { ReactNode } from 'react';
import { FieldError, FieldValues, Merge, Path, UseFormSetValue } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormImageUploaderInput from '../FormImageUploaderInput/FormImageUploaderInput';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormImageUploader.module.scss';

interface Props<T extends FieldValues> {
  children: ReactNode;
  label: string;
  field: Path<T>;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  imageCount: number;
  setValue: UseFormSetValue<T>;
}

const FormImageUploader = <T extends FieldValues>({
  children,
  label,
  field,
  error,
  imageCount,
  setValue,
}: Props<T>) => {
  return (
    <div className={styles.formImageUploader}>
      <FormImageUploaderInput
        field={field}
        label={label}
        imageCount={imageCount}
        setValue={setValue}
      />
      {children}
      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormImageUploader;
