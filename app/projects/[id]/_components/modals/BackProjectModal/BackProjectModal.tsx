import { AnimatePresence } from 'framer-motion';

import { truncateText } from '@/app/utils';
import { useBackProjectModal } from '../../../_hooks/useBackProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/form/Form/Form';
import FormHeading from '../../../../../components/form/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormInputWithInlineLabel from '../../../../../components/form/FormInputWithInlineLabel/FormInputWithInlineLabel';
import FormTextarea from '../../../../../components/form/FormTextarea/FormTextarea';
import FormErrorMessage from '../../../../../components/form/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../../../../components/form/FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../../../../components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../../../../components/VerticalSpacer/VerticalSpacer';

interface Props {
  projectId: number;
  onClose: () => void;
}

const BackProjectModal = ({ projectId, onClose }: Props) => {
  const { isLoading, fieldErrors, submissionError, register, handleFormSubmit } =
    useBackProjectModal(projectId, onClose);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleFormSubmit}>
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
              <FormErrorMessage>
                {truncateText(submissionError.message, 300, true)}
              </FormErrorMessage>
              <VerticalSpacer />
            </>
          )}
        </AnimatePresence>

        <VerticalSpacer />
        <FormSubmitButton disabled={isLoading}>
          {isLoading ? 'Please confirm in MetaMask...' : 'Submit Donation'}
        </FormSubmitButton>
      </Form>
    </ModalBackdrop>
  );
};

export default BackProjectModal;
