'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { convertToTimestamp, getFutureDate, getTomorrowsDate } from '@/app/utils';
import { usePinata } from '@/app/hooks/usePinata';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';

import styles from '../modal.module.scss';
import ModalBackdrop from '../ModalBackdrop/ModalBackdrop';
import Form from '../../Form/Form';
import SpaceBetweenRow from '../../SpaceBetweenRow/SpaceBetweenRow';
import FormHeading from '../../FormHeading/FormHeading';
import CloseModalButton from '../CloseModalButton/CloseModalButton';
import VerticalSpacer from '../../VerticalSpacer/VerticalSpacer';
import useFormHandler from '@/app/hooks/useFormHandler';
import { createProjectSchema } from '@/app/validationSchemas';
import { useProjectStore } from '@/app/store';
import { z } from 'zod';
import FormInputWithInlineLabel from '../../FormInputWithInlineLabel/FormInputWithInlineLabel';

interface Props {
  onClose: () => void;
}

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

const CreateProjectModal = ({ onClose }: Props) => {
  const categories = useProjectStore((s) => s.categories);

  const { createProject } = useBlockchain();
  const { isUploading, uploadImageFiles } = usePinata();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState(false);

  const {
    errors: fieldErrors,
    register,
    handleSubmit,
  } = useFormHandler({
    schema: createProjectSchema,
    defaultValues: {
      title: '',
      cost: undefined,
      expiresAt: undefined,
      category: 0,
      images: [],
      description: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles].slice(0, 3); // Limit to three files

    setFiles(newFiles);
  };

  const onSubmit: SubmitHandler<CreateProjectFormData> = async (data) => {
    console.log(data);

    // if (!files.length) {
    //   setFileError(true);
    //   return;
    // }

    // const { uploadedCids } = await uploadImageFiles(files);

    // data.imageURLs = uploadedCids;
    // data.expiresAt = convertToTimestamp(data.expiresAt as string) as unknown as string;
    // data.category = +data.category;

    // await createProject(data);
    // toast.success('Project created successfully, changes will reflect momentarily.');
    // onClose();
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
          label="Cost"
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

        {/* Temp Button */}
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
        {/* Temp Button */}
      </Form>
    </ModalBackdrop>
  );

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.imagesContainer}>
            <label htmlFor="images">Project Images</label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              {...register('images', {
                onChange: handleChange,
              })}
            />
            <ul className={styles.imageList}>
              {files.map((file, index) => (
                <li key={index} className={styles.listItem}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className={styles.projectImage}
                    width={100}
                    height={100}
                  />
                  {file.name}
                  <button
                    onClick={() =>
                      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
                    }
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {fileError && <span>Select at least 1 image to proceed</span>}
          </div>
          <select
            {...register('category', { required: true })}
            className={styles.categories}
          >
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <textarea
            className={classNames(styles.input, styles.textArea)}
            placeholder="Description"
            {...register('description', { required: true })}
          />
          <Button disabled={isUploading}>
            {isUploading ? 'Uploading Images...' : 'Submit Project'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
