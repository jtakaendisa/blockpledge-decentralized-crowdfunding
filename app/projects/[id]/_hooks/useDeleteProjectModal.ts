import { FormEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { deleteProjectSchema } from '@/app/validationSchemas';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';

type DeleteProjectFormData = z.infer<typeof deleteProjectSchema>;

export const useDeleteProjectModal = (projectId: number, onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  const { deleteProject } = useBlockchain();

  const {
    errors: fieldErrors,
    register,
    handleSubmit,
  } = useFormHandler({
    schema: deleteProjectSchema,
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit: SubmitHandler<DeleteProjectFormData> = async (data) => {
    try {
      setIsLoading(true);

      await deleteProject(projectId, data.reason);
      toast.success('Project has been deleted, changes will reflect momentarily.');
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
