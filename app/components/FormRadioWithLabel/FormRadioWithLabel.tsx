import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './FormRadioWithLabel.module.scss';

interface Props<T extends FieldValues, U extends string> {
  label?: string;
  id: U;
  field: Path<T>;
  register: UseFormRegister<T>;
}

const FormRadioWithLabel = <T extends FieldValues, U extends string>({
  label,
  id,
  field,
  register,
}: Props<T, U>) => {
  return (
    <div className={styles.radioOption}>
      <input id={id} type="radio" value={id} {...register(field)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormRadioWithLabel;
