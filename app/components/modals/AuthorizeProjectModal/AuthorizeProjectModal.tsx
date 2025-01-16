import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import { authorizeProjectSchema } from '@/app/validationSchemas';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useFormHandler } from '@/app/hooks/useFormHandler';
import ModalBackdrop from '../../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormFieldsetWithLegend from '../../FormFieldsetWithLegend/FormFieldsetWithLegend';
import FormRadioWithLabel from '../../FormRadioWithLabel/FormRadioWithLabel';
import FormTextarea from '../../FormTextarea/FormTextarea';
import FormSubmitButton from '../../FormSubmitButton/FormSubmitButton';
import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

type AuthorizeProjectFormData = z.infer<typeof authorizeProjectSchema>;

const radioOptions = [
  {
    label: 'Accept',
    id: 'accept',
  },
  {
    label: 'Reject',
    id: 'reject',
  },
] as const;

const AuthorizeProjectModal = ({ projectId, onClose }: Props) => {
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

  const watchDecision = watch('decision');

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

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleSubmit(onSubmit)}>
        <SpaceBetweenRow>
          <FormHeading>Authorize Project</FormHeading>
          <CloseModalButton disabled={isLoading} onClose={onClose} />
        </SpaceBetweenRow>
        <VerticalSpacer height={20} />

        <FormFieldsetWithLegend legend="Approval Decision" error={fieldErrors.decision}>
          {radioOptions.map(({ label, id }) => (
            <FormRadioWithLabel
              key={id}
              label={label}
              id={id}
              field="decision"
              register={register}
            />
          ))}
        </FormFieldsetWithLegend>
        <VerticalSpacer />

        {watchDecision === 'reject' && (
          <>
            <FormTextarea
              field="reason"
              placeholder="Reason for rejection..."
              error={fieldErrors.reason}
              register={register}
            />
            <VerticalSpacer />
          </>
        )}

        <AnimatePresence>
          {submissionError && (
            <>
              <FormErrorMessage>{submissionError.message}</FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton color="orange" disabled={isLoading}>
          {isLoading ? 'Working on it...' : 'Submit Decision'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default AuthorizeProjectModal;
