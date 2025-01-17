import { AnimatePresence } from 'framer-motion';

import { Project } from '@/app/entities';
import { truncateText } from '@/app/utils';
import { useEditProjectModal } from '../../../_hooks/useEditProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/forms/Form/Form';
import FormHeading from '../../../../../components/forms/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormImageUploader from '../../../../../components/forms/FormImageUploader/FormImageUploader';
import FormImageUploaderPreview from '../../../../../components/forms/FormImageUploaderPreview/FormImageUploaderPreview';
import FormTextarea from '../../../../../components/forms/FormTextarea/FormTextarea';
import FormErrorMessage from '../../../../../components/forms/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../../../../components/forms/FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../../../../components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../../../../components/VerticalSpacer/VerticalSpacer';

interface Props {
  project: Project;
  onClose: () => void;
}

const EditProjectModal = ({ project, onClose }: Props) => {
  const {
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
  } = useEditProjectModal(project, onClose);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleFormSubmit}>
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
