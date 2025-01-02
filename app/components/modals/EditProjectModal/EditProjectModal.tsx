import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Project } from '@/app/entities';
import { usePinata } from '@/app/hooks/usePinata';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';
import xmarkSVG from '@/public/icons/xmark.svg';

import styles from '../modal.module.scss';

interface Props {
  project: Project | null;
  closeModal: () => void;
}

export interface EditFormInputs {
  imageURLs: File[] | string[];
  description: string;
}

const EditProjectModal = ({ project, closeModal }: Props) => {
  const { updateProject } = useBlockchain();
  const { uploadFiles } = usePinata((uploading) => setUploading(uploading));
  const [files, setFiles] = useState<File[]>([]);
  const [existingImageURLs, setExistingImageURLs] = useState(
    project ? project.imageURLs : []
  );
  const [fileError, setFileError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<EditFormInputs>({
    defaultValues: {
      imageURLs: project?.imageURLs,
      description: project?.description,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = Math.max(0, 3 - existingImageURLs.length);
    const newFiles = [...files, ...selectedFiles].slice(0, remainingSlots); // Limit to remaining slots

    setFiles(newFiles);
  };

  const onSubmit: SubmitHandler<EditFormInputs> = async (data) => {
    if (!project) return;

    if (!files.length && !existingImageURLs.length) {
      setFileError(true);
      return;
    }

    if (files.length) {
      const { uploadedCids } = await uploadFiles(files);
      const combinedCids = [...uploadedCids, ...existingImageURLs];

      data.imageURLs = combinedCids;
    } else {
      data.imageURLs = existingImageURLs;
    }

    await updateProject({ ...data, id: project.id });
    toast.success('Project has been updated, changes will reflect momentarily.');

    closeModal();
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  if (!project) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <p>{project.title}</p>
            <button
              className={classNames({
                [styles.close]: true,
                [styles.disabled]: uploading,
              })}
              type="button"
              onClick={() => closeModal()}
              disabled={uploading}
            >
              <Image src={xmarkSVG} alt="close" width={22} height={22} />
            </button>
          </div>
          <div className={styles.imagesContainer}>
            <label htmlFor="images">Project Images</label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              {...register('imageURLs', {
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
                    type="button"
                    onClick={() =>
                      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
                    }
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              ))}
              {existingImageURLs.map((image, index) => (
                <li key={index} className={styles.listItem}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image}`}
                    alt={image}
                    className={styles.projectImage}
                    width={100}
                    height={100}
                  />
                  image {index + 1}
                  <button
                    type="button"
                    onClick={() =>
                      setExistingImageURLs((prevFiles) =>
                        prevFiles.filter((_, i) => i !== index)
                      )
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
          <textarea
            className={classNames(styles.input, styles.textArea)}
            placeholder="Description"
            {...register('description', { required: true })}
          />
          <Button disabled={uploading}>
            {uploading ? 'Uploading Images...' : 'Update Project'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
