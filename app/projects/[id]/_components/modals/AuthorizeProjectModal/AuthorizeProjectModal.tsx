import { AnimatePresence } from 'framer-motion';

import { truncateText } from '@/app/utils';
import { useAuthorizeProjectModal } from '../../../_hooks/useAuthorizeProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/form/Form/Form';
import FormHeading from '../../../../../components/form/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormFieldsetWithLegend from '../../../../../components/form/FormFieldsetWithLegend/FormFieldsetWithLegend';
import FormRadioWithLabel from '../../../../../components/form/FormRadioWithLabel/FormRadioWithLabel';
import FormTextarea from '../../../../../components/form/FormTextarea/FormTextarea';
import FormSubmitButton from '../../../../../components/form/FormSubmitButton/FormSubmitButton';
import FormErrorMessage from '../../../../../components/form/FormErrorMessage/FormErrorMessage';
import SpaceBetweenRow from '../../../../../components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../../../../components/VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

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
  const {
    isLoading,
    fieldErrors,
    submissionError,
    decision,
    register,
    handleFormSubmit,
  } = useAuthorizeProjectModal(projectId, onClose);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleFormSubmit}>
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

        {decision === 'reject' && (
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
              <FormErrorMessage>
                {truncateText(submissionError.message, 300, true)}
              </FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton color="orange" disabled={isLoading}>
          {isLoading ? 'Please confirm in MetaMask...' : 'Submit Decision'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default AuthorizeProjectModal;
