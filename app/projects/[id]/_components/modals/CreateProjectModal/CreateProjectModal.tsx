import { AnimatePresence } from 'framer-motion';

import { truncateText } from '@/app/utils';
import { useCreateProjectModal } from '../../../_hooks/useCreateProjectModal';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../../../../components/forms/Form/Form';
import FormHeading from '../../../../../components/forms/FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import FormInputWithInlineLabel from '../../../../../components/forms/FormInputWithInlineLabel/FormInputWithInlineLabel';
import FormSelect from '../../../../../components/forms/FormSelect/FormSelect';
import FormSelectOption from '../../../../../components/forms/FormSelectOption/FormSelectOption';
import FormTextarea from '../../../../../components/forms/FormTextarea/FormTextarea';
import FormImageUploader from '../../../../../components/forms/FormImageUploader/FormImageUploader';
import FormImageUploaderPreview from '../../../../../components/forms/FormImageUploaderPreview/FormImageUploaderPreview';
import FormErrorMessage from '../../../../../components/forms/FormErrorMessage/FormErrorMessage';
import FormSubmitButton from '../../../../../components/forms/FormSubmitButton/FormSubmitButton';
import SpaceBetweenRow from '../../../../../components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../../../../../components/VerticalSpacer/VerticalSpacer';

interface Props {
  onClose: () => void;
}

const CreateProjectModal = ({ onClose }: Props) => {
  const {
    isLoading,
    isUploading,
    fieldErrors,
    submissionError,
    categories,
    images,
    register,
    setValue,
    handleFormSubmit,
  } = useCreateProjectModal(onClose);

  return (
    <ModalBackdrop>
      <Form width={670} onSubmit={handleFormSubmit}>
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
          imageCount={images.length}
          setValue={setValue}
        >
          {!!images.length && <FormImageUploaderPreview images={images} />}
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
