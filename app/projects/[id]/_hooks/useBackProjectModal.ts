import { FormEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { backProjectSchema } from '@/app/validationSchemas';
import { backProjectFirebase } from '@/app/services/authService';
import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';

type BackProjectFormData = z.infer<typeof backProjectSchema>;

export const useBackProjectModal = (projectId: number, onClose: () => void) => {
  const { authUser, connectedAccount } = useGlobalStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  const { backProject } = useBlockchain();

  const {
    errors: fieldErrors,
    handleSubmit,
    register,
  } = useFormHandler({
    schema: backProjectSchema,
  });

  const onSubmit: SubmitHandler<BackProjectFormData> = async ({ amount, comment }) => {
    try {
      setIsLoading(true);

      if (connectedAccount && authUser) {
        await backProject(projectId, amount, comment, connectedAccount);
        await backProjectFirebase(authUser, projectId);
      }

      toast.success(
        'Thank you! Your donation has been received, changes will reflect momentarily.'
      );

      onClose();
    } catch (error) {
      setSubmissionError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    return handleSubmit(onSubmit)();
  };

  return {
    isLoading,
    fieldErrors,
    submissionError,
    register,
    handleFormSubmit,
  };
};
