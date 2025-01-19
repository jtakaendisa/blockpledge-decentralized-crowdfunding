import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './FormRadioWithLabel.module.scss';

interface Props<T extends FieldValues, F extends Path<T>> {
  label?: string;
  id: T[F];
  field: F;
  register: UseFormRegister<T>;
}

const FormRadioWithLabel = <T extends FieldValues, F extends Path<T>>({
  label,
  id,
  field,
  register,
}: Props<T, F>) => {
  return (
    <div className={styles.radioOption}>
      <input id={id} type="radio" value={id} {...register(field)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default FormRadioWithLabel;
