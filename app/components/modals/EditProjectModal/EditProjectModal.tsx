import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { Project } from '@/app/entities';
import { editProjectSchema } from '@/app/validationSchemas';
import { truncateText } from '@/app/utils';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import { usePinata } from '@/app/hooks/usePinata';
import ModalBackdrop from '../../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormImageUploader from '../../FormImageUploader/FormImageUploader';
import FormImageUploaderPreview from '../../FormImageUploaderPreview/FormImageUploaderPreview';
import FormTextarea from '../../FormTextarea/FormTextarea';
import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';

interface Props {
  project: Project;
  onClose: () => void;
}

type EditProjectFormData = z.infer<typeof editProjectSchema>;

const EditProjectModal = ({ project, onClose }: Props) => {
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

      if (images?.length) {
        const { uploadedImageCIDs } = await uploadImageFiles(images);
        imageURLs = uploadedImageCIDs;
      } else {
        if (currentImageURLs?.length) {
          imageURLs = currentImageURLs;
        }
      }

      await updateProject(project.id, description, imageURLs);
      toast.success('Project has been updated, changes will reflect momentarily.');
      onClose();
    } catch (error) {
      setSubmissionError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (images?.length) {
      setValue('currentImageURLs', []);
    }
  }, [images, setValue]);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Edit Project</FormHeading>
          <CloseModalButton onClose={onClose} disabled={isLoading} />
        </SpaceBetweenRow>
        <VerticalSpacer height={20} />

        <FormImageUploader
          label="Image Upload"
          field="images"
          error={fieldErrors.images}
          imageCount={images!.length}
          setValue={setValue}
        >
          {!!currentImageURLs?.length && (
            <FormImageUploaderPreview images={currentImageURLs} />
          )}
          {!!images?.length && <FormImageUploaderPreview images={images} />}
        </FormImageUploader>
        <VerticalSpacer />

        <FormTextarea
          field="description"
          placeholder="Description..."
          error={fieldErrors.description}
          register={register}
          required
        />
        <VerticalSpacer />

        <AnimatePresence>
          {submissionError && (
            <>
              <FormErrorMessage>
                {truncateText(submissionError.message, 300, true)}
              </FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton color="gray" disabled={isSubmitButtonDisabled}>
          {isLoading && isUploading
            ? 'Uploading Image(s)...'
            : isLoading
            ? 'Please confirm in MetaMask...'
            : 'Submit Changes'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default EditProjectModal;
