import { AnimatePresence } from 'framer-motion';

import { Project } from '@/app/entities';
import { truncateText } from '@/app/utils';
import { useEditProjectModal } from '../../../_hooks/useEditProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/form/Form/Form';
import FormHeading from '../../../../../components/form/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormImageUploader from '../../../../../components/form/FormImageUploader/FormImageUploader';
import FormImageUploaderPreview from '../../../../../components/form/FormImageUploaderPreview/FormImageUploaderPreview';
import FormTextarea from '../../../../../components/form/FormTextarea/FormTextarea';
import FormErrorMessage from '../../../../../components/form/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../../../../components/form/FormSubmitButton/FormSubmitButton';
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
    currentImageUrls,
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
          {!!currentImageUrls?.length && (
            <FormImageUploaderPreview images={currentImageUrls} />
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
