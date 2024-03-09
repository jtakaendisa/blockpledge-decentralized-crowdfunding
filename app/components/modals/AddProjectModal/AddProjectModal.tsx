import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

import { useModalStore } from '@/app/store';
import usePinata from '@/app/hooks/usePinata';
import useBlockchain from '@/app/hooks/useBlockchain';
import { convertToTimestamp, getTomorrowsDate } from '@/app/utils';
import Button from '../../Button/Button';
import newProject from '@/public/images/new-project.jpg';

import styles from '../modal.module.scss';

export interface FormInputs {
  id?: number;
  title: string;
  cost: string;
  expiresAt: Date | string | number;
  imageURLs: File[] | string[];
  description: string;
}

const AddProjectModal = () => {
  const closeModal = useModalStore((s) => s.setIsOpen);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { uploadFiles } = usePinata(setUploading);
  const { createProject } = useBlockchain();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      imageURLs: [],
      cost: '',
      expiresAt: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles].slice(0, 3); // Limit to three files

    setFiles(newFiles);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!files.length) {
      setFileError(true);
      return;
    }

    const { uploadedCids } = await uploadFiles(files);

    data.imageURLs = uploadedCids;
    data.expiresAt = convertToTimestamp(data.expiresAt as string);

    await createProject(data);
    toast.success('Project created successfully, changes will reflect momentarily.');
    closeModal('add');
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <p>Add Project</p>
            <button
              className={classNames({
                [styles.close]: true,
                [styles.disabled]: uploading,
              })}
              type="button"
              onClick={() => closeModal('add')}
              disabled={uploading}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className={styles.image}>
            <Image src={newProject} alt="Create a Project" />
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('title', { required: true })}
          />
          <input
            className={styles.input}
            type="number"
            step={0.01}
            min={0.01}
            placeholder="Amount (ETH)"
            {...register('cost', { required: true })}
          />
          <input
            className={styles.input}
            type="date"
            placeholder="Expires"
            {...register('expiresAt', { required: true, min: getTomorrowsDate() })}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('imageURLs', {
              onChange: handleChange,
            })}
          />
          <div>
            <h3>Selected Files:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                    height={100}
                  />
                  {file.name}
                  <button
                    onClick={() =>
                      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
                    }
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
            {uploading ? 'Uploading Images...' : 'Submit Project'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
