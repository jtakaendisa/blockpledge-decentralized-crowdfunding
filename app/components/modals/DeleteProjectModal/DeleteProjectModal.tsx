import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { deleteProjectSchema } from '@/app/validationSchemas';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import ModalBackdrop from '../../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormTextarea from '../../FormTextarea/FormTextarea';
import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

type DeleteProjectFormData = z.infer<typeof deleteProjectSchema>;

const DeleteProjectModal = ({ projectId, onClose }: Props) => {
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

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Delete Project</FormHeading>
          <CloseModalButton onClose={onClose} disabled={isLoading} />
        </SpaceBetweenRow>
        <VerticalSpacer height={20} />

        <FormTextarea
          field="reason"
          placeholder="Reason for deletion..."
          error={fieldErrors.reason}
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
        <FormSubmitButton color="red" disabled={isLoading}>
          {isLoading ? 'Working on it...' : 'Confirm Deletion'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default DeleteProjectModal;
