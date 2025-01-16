import { ChangeEvent } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

import styles from './FormImageUploaderInput.module.scss';

interface Props<T extends FieldValues> {
  field: Path<T>;
  label: string;
  images: PathValue<T, Path<T>>;
  setValue: UseFormSetValue<T>;
}

const getCountText = <T extends FieldValues>(files: PathValue<T, Path<T>>) =>
  files.length === 0
    ? 'No file chosen'
    : files.length === 1
    ? '1 file chosen'
    : `${files.length} files chosen`;

const FormImageUploaderInput = <T extends FieldValues>({
  field,
  label,
  images,
  setValue,
}: Props<T>) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];

    setValue(field, files.slice(0, 3) as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
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
        onChange={handleFileChange}
      />
      <span className={styles.count}>{getCountText(images)}</span>
    </div>
  );
};

export default FormImageUploaderInput;
