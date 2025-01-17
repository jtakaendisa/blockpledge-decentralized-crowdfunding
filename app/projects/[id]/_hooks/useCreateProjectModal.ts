import { FormEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { ParsedCreateProjectFormData } from '@/app/entities';
import { createProjectSchema } from '@/app/validationSchemas';
import { useProjectStore } from '@/app/store';
import { convertToTimestamp } from '@/app/utils';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import { usePinata } from '@/app/hooks/usePinata';

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export const useCreateProjectModal = (onClose: () => void) => {
  const categories = useProjectStore((s) => s.categories);

  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  const { createProject } = useBlockchain();
  const { isUploading, uploadImageFiles } = usePinata();

  const {
    errors: fieldErrors,
    register,
    setValue,
    watch,
    handleSubmit,
  } = useFormHandler({
    schema: createProjectSchema,
    defaultValues: {
      images: [],
    },
  });

  const images = watch('images');

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    try {
      setIsLoading(true);

      const { uploadedImageCIDs } = await uploadImageFiles(data.images);

      const { images, ...rest } = data;

      const parsedFormData: ParsedCreateProjectFormData = {
        ...rest,
        imageURLs: uploadedImageCIDs,
        expiresAt: convertToTimestamp(data.expiresAt),
      };

      await createProject(parsedFormData);
      toast.success('Project created successfully, changes will reflect momentarily.');
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
    isUploading,
    fieldErrors,
    submissionError,
    categories,
    images,
    register,
    setValue,
    handleFormSubmit,
  };
};
