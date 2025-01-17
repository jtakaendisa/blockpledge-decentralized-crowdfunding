'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { useAccountStore } from '@/app/store';
import { backProjectSchema } from '@/app/validationSchemas';
import { backProjectFirebase } from '@/app/services/authService';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import ModalBackdrop from '../../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormInputWithInlineLabel from '../../FormInputWithInlineLabel/FormInputWithInlineLabel';
import FormTextarea from '../../FormTextarea/FormTextarea';
import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

type BackProjectFormData = z.infer<typeof backProjectSchema>;

const BackProjectModal = ({ projectId, onClose }: Props) => {
  const authUser = useAccountStore((s) => s.authUser);
  const connectedAcount = useAccountStore((s) => s.connectedAccount);

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

      if (connectedAcount && authUser) {
        await backProject(projectId, amount, comment, connectedAcount);
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

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Back Project</FormHeading>
          <CloseModalButton onClose={onClose} disabled={isLoading} />
        </SpaceBetweenRow>
        <VerticalSpacer height={20} />

        <FormInputWithInlineLabel
          label="Amount (ETH)"
          id="amount"
          type="number"
          error={fieldErrors.amount}
          register={register}
          required
        />
        <VerticalSpacer />

        <FormTextarea
          field="comment"
          placeholder="Comment (Optional)..."
          error={fieldErrors.comment}
          register={register}
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
        <FormSubmitButton disabled={isLoading}>
          {isLoading ? 'Working on it...' : 'Submit Donation'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default BackProjectModal;
