import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { Project } from '@/app/entities';
import { editProjectSchema } from '@/app/validationSchemas';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import { usePinata } from '@/app/hooks/usePinata';

type EditProjectFormData = z.infer<typeof editProjectSchema>;

export const useEditProjectModal = (project: Project, onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<Error | null>(null);

  const { updateProject } = useBlockchain();
  const { isUploading, uploadImageFiles } = usePinata();

  const {
    errors: fieldErrors,
    handleSubmit,
    register,
    watch,
    setValue,
  } = useFormHandler({
    schema: editProjectSchema,
    defaultValues: {
      currentImageUrls: project.imageUrls,
      images: [],
      description: project.description,
    },
  });

  const { currentImageUrls, images, description } = watch();

  const isSubmitButtonDisabled =
    isLoading ||
    (!images?.length && project.description === description) ||
    (!images?.length && !currentImageUrls?.length);

  const onSubmit: SubmitHandler<EditProjectFormData> = async (data) => {
    try {
      setIsLoading(true);

      let imageUrls: string[] = [];

      if (data.images?.length) {
        const { uploadedImageCIDs } = await uploadImageFiles(data.images);
        imageUrls = uploadedImageCIDs;
      } else {
        if (currentImageUrls?.length) {
          imageUrls = currentImageUrls;
        }
      }

      await updateProject(project.id, data.description, imageUrls);
      toast.success('Project has been updated, changes will reflect momentarily.');
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

  useEffect(() => {
    if (images?.length) {
      setValue('currentImageUrls', []);
    }
  }, [images, setValue]);

  return {
    isLoading,
    isUploading,
    isSubmitButtonDisabled,
    images,
    currentImageUrls,
    fieldErrors,
    submissionError,
    register,
    setValue,
    handleFormSubmit,
  };
};
