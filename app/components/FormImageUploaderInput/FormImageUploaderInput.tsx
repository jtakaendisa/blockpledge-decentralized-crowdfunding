import { ChangeEvent } from 'react';
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

import styles from './FormImageUploaderInput.module.scss';

interface Props<T extends FieldValues> {
  field: Path<T>;
  label: string;
  required?: boolean;
  images: File[];
  setValue: UseFormSetValue<T>;
}

const getCountText = (files: File[]) =>
  files.length === 0
    ? 'No file chosen'
    : files.length === 1
    ? '1 file chosen'
    : `${files.length} files chosen`;

const FormImageUploaderInput = <T extends FieldValues>({
  field,
  label,
  required,
  images,
  setValue,
}: Props<T>) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    setValue('images', files.slice(0, 3), { shouldValidate: true });
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={field} className={styles.label}>
        {label}
      </label>
      <input
        id={field}
        type="file"
        accept="image/*"
        className={styles.input}
        multiple
        required={required}
        onChange={handleFileChange}
      />
      <span className={styles.count}>{getCountText(images)}</span>
    </div>
  );
};

export default FormImageUploaderInput;
