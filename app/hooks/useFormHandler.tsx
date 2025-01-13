import { useEffect } from 'react';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { isObjectEmpty } from '../utils';

type Props<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
};

const useFormHandler = <T extends FieldValues>({ schema, defaultValues }: Props<T>) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchAllFields = watch();

  const hasNoErrors = isObjectEmpty(errors);

  useEffect(() => {
    if (isSubmitSuccessful && hasNoErrors) {
      reset();
    }
  }, [isSubmitSuccessful, hasNoErrors, reset]);

  return {
    control,
    isSubmitSuccessful,
    errors,
    watchAllFields,
    register,
    handleSubmit,
  };
};

export default useFormHandler;
