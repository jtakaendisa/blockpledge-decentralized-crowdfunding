import {
  FieldError,
  FieldValues,
  Merge,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import FormImageUploaderInput from '../FormImageUploaderInput/FormImageUploaderInput';
import FormImageUploaderPreview from '../FormImageUploaderPreview/FormImageUploaderPreview';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

import styles from './FormImageUploader.module.scss';

interface Props<T extends FieldValues> {
  label: string;
  field: Path<T>;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  required?: boolean;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

const FormImageUploader = <T extends FieldValues>({
  label,
  field,
  error,
  required,
  setValue,
  watch,
}: Props<T>) => {
  const images = watch(field);

  return (
    <div className={styles.formImageUploader}>
      <FormImageUploaderInput
        field={field}
        label={label}
        images={images}
        required={required}
        setValue={setValue}
      />

      {!!images.length && <FormImageUploaderPreview images={images} />}

      <AnimatePresence>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </AnimatePresence>
    </div>
  );
};

export default FormImageUploader;
