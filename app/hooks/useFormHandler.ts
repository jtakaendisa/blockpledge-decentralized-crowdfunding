import { useEffect } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues?: DefaultValues<T>;
}

export const useFormHandler = <T extends FieldValues>({
  schema,
  defaultValues,
}: Props<T>) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return {
    errors,
    register,
    setValue,
    watch,
    handleSubmit,
  };
};
