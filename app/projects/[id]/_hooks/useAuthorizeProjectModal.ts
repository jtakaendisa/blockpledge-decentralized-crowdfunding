import { FormEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { authorizeProjectSchema } from '@/app/validationSchemas';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';

type AuthorizeProjectFormData = z.infer<typeof authorizeProjectSchema>;

export const useAuthorizeProjectModal = (projectId: number, onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  const { acceptProject, rejectProject } = useBlockchain();

  const {
    errors: fieldErrors,
    register,
    watch,
    handleSubmit,
  } = useFormHandler({
    schema: authorizeProjectSchema,
    defaultValues: {
      decision: 'accept',
    },
  });

  const decision = watch('decision');

  const onSubmit: SubmitHandler<AuthorizeProjectFormData> = async ({
    decision,
    reason,
  }) => {
    try {
      setIsLoading(true);

      if (decision === 'accept') {
        await acceptProject(projectId);
        toast.success('Project has been accepted, changes will reflect momentarily.');
      } else {
        await rejectProject(projectId, reason!);
        toast.success('Project has been rejected, changes will reflect momentarily.');
      }

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
    decision,
    register,
    handleFormSubmit,
  };
};
