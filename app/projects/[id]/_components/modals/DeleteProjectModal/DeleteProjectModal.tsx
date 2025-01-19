import { AnimatePresence } from 'framer-motion';

import { truncateText } from '@/app/utils';
import { useDeleteProjectModal } from '../../../_hooks/useDeleteProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/form/Form/Form';
import FormHeading from '../../../../../components/form/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormTextarea from '../../../../../components/form/FormTextarea/FormTextarea';
import FormErrorMessage from '../../../../../components/form/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../../../../components/form/FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../../../../components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../../../../components/VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

const DeleteProjectModal = ({ projectId, onClose }: Props) => {
  const { isLoading, fieldErrors, submissionError, register, handleFormSubmit } =
    useDeleteProjectModal(projectId, onClose);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleFormSubmit}>
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
              <FormErrorMessage>
                {truncateText(submissionError.message, 300, true)}
              </FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton color="red" disabled={isLoading}>
          {isLoading ? 'Please confirm in MetaMask...' : 'Confirm Deletion'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default DeleteProjectModal;
