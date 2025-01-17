'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';

import { ParsedCreateProjectFormData } from '@/app/entities';
import { useProjectStore } from '@/app/store';
import { convertToTimestamp, truncateText } from '@/app/utils';
import { createProjectSchema } from '@/app/validationSchemas';
import { usePinata } from '@/app/hooks/usePinata';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import ModalBackdrop from '../../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormInputWithInlineLabel from '../../FormInputWithInlineLabel/FormInputWithInlineLabel';
import FormSelect from '../../FormSelect/FormSelect';
import FormSelectOption from '../../FormSelectOption/FormSelectOption';
import FormTextarea from '../../FormTextarea/FormTextarea';
import FormImageUploader from '../../FormImageUploader/FormImageUploader';
import FormImageUploaderPreview from '../../FormImageUploaderPreview/FormImageUploaderPreview';
import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';
import FormSubmitButton from '../../FormSubmitButton/FormSubmitButton';

interface Props {
  onClose: () => void;
}

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

const CreateProjectModal = ({ onClose }: Props) => {
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

  const watchImages = watch('images');

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

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Create Project</FormHeading>
          <CloseModalButton onClose={onClose} disabled={isLoading} />
        </SpaceBetweenRow>
        <VerticalSpacer height={20} />

        <FormInputWithInlineLabel
          label="Title"
          id="title"
          type="text"
          error={fieldErrors.title}
          register={register}
          required
        />
        <VerticalSpacer />

        <FormInputWithInlineLabel
          label="Cost (ETH)"
          id="cost"
          type="number"
          error={fieldErrors.cost}
          register={register}
          required
        />
        <VerticalSpacer />

        <FormInputWithInlineLabel
          label="Due date"
          id="expiresAt"
          type="date"
          error={fieldErrors.expiresAt}
          register={register}
          required
        />
        <VerticalSpacer />

        <FormSelect
          field="categoryId"
          placeholder="Select a category"
          error={fieldErrors.categoryId}
          register={register}
          required
        >
          {categories.map(({ id, name }) => (
            <FormSelectOption key={id} value={id}>
              {name}
            </FormSelectOption>
          ))}
        </FormSelect>
        <VerticalSpacer />

        <FormImageUploader
          label="Image Upload"
          field="images"
          error={fieldErrors.images}
          imageCount={watchImages.length}
          setValue={setValue}
        >
          {!!watchImages.length && <FormImageUploaderPreview images={watchImages} />}
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
        <FormSubmitButton disabled={isLoading}>
          {isLoading && isUploading
            ? 'Uploading Image(s)...'
            : isLoading
            ? 'Please confirm in MetaMask...'
            : 'Submit Project'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default CreateProjectModal;
