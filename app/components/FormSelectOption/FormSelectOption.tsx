import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: number;
}

const FormSelectOption = ({ children, value }: Props) => {
  return <option value={value}>{children}</option>;
};

export default FormSelectOption;
