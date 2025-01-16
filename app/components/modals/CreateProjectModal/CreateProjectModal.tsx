'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';

import { ParsedCreateProjectFormData } from '@/app/entities';
import { useProjectStore } from '@/app/store';
import { convertToTimestamp } from '@/app/utils';
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

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    try {
      const { uploadedCids } = await uploadImageFiles(data.images);

      const parsedFormData: ParsedCreateProjectFormData = {
        ...data,
        images: uploadedCids,
        expiresAt: convertToTimestamp(data.expiresAt),
      };

      await createProject(parsedFormData);
      toast.success('Project created successfully, changes will reflect momentarily.');
      onClose();
    } catch (error) {
      setSubmissionError(error as Error);
    }
  };

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Create Project</FormHeading>
          <CloseModalButton onClose={onClose} disabled={isUploading} />
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
          setValue={setValue}
          watch={watch}
        />
        <VerticalSpacer />

        <FormTextarea
          field="description"
          placeholder="Description"
          error={fieldErrors.description}
          register={register}
          required
        />
        <VerticalSpacer />

        <AnimatePresence>
          {submissionError && (
            <>
              <FormErrorMessage>{submissionError.message}</FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton disabled={isUploading}>
          {isUploading ? 'Uploading Images...' : 'Submit Project'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default CreateProjectModal;
