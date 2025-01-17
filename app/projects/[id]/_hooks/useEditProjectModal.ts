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
      currentImageURLs: project.imageURLs,
      images: [],
      description: project.description,
    },
  });

  const { currentImageURLs, images, description } = watch();

  const isSubmitButtonDisabled =
    isLoading ||
    (!images?.length && project.description === description) ||
    (!images?.length && !currentImageURLs?.length);

  const onSubmit: SubmitHandler<EditProjectFormData> = async (data) => {
    try {
      setIsLoading(true);

      let imageURLs: string[] = [];

      if (data.images?.length) {
        const { uploadedImageCIDs } = await uploadImageFiles(data.images);
        imageURLs = uploadedImageCIDs;
      } else {
        if (currentImageURLs?.length) {
          imageURLs = currentImageURLs;
        }
      }

      await updateProject(project.id, data.description, imageURLs);
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
      setValue('currentImageURLs', []);
    }
  }, [images, setValue]);

  return {
    isLoading,
    isUploading,
    isSubmitButtonDisabled,
    images,
    currentImageURLs,
    fieldErrors,
    submissionError,
    register,
    setValue,
    handleFormSubmit,
  };
};
