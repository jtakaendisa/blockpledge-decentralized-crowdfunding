'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

import { ModalVariant, useModalStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';
import robot from '@/public/images/robot.jpg';

import styles from './ProjectModal.module.scss';

interface Props {
  variant: ModalVariant;
}

export interface AddFormInputs {
  title: string;
  cost: string;
  expiresAt: Date | string | number;
  imageURL: string;
  description: string;
}

const ProjectModal = ({ variant }: Props) => {
  const closeModal = useModalStore((s) => s.setIsOpen);
  const { createProject } = useBlockchain();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<AddFormInputs>();

  const convertToTimestamp = (dateString: string) => Date.parse(dateString) / 1000;

  const onSubmit: SubmitHandler<AddFormInputs> = async (data) => {
    data.expiresAt = convertToTimestamp(data.expiresAt as string);
    await createProject(data);
    toast.success('Project created successfully, changes will reflect momentarily.');
    closeModal(variant);
  };

  useEffect(() => {
    reset({
      title: '',
      cost: '',
      expiresAt: '',
      imageURL: '',
      description: '',
    });
  }, [isSubmitSuccessful, reset]);

  if (variant === 'add') {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
              <p>Add Project</p>
              <button
                className={styles.close}
                type="button"
                onClick={() => closeModal(variant)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className={styles.image}>
              <Image src={robot} alt="robot" />
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
              {...register('expiresAt', { required: true })}
            />
            <input
              className={styles.input}
              type="url"
              placeholder="Image URL"
              {...register('imageURL', { required: true })}
            />
            <textarea
              className={classNames(styles.input, styles.textArea)}
              placeholder="Description"
              {...register('description', { required: true })}
            />
            <Button>Submit Project</Button>
          </form>
        </div>
      </div>
    );
  }

  if (variant === 'edit') {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <form className={styles.form}>
            <div className={styles.row}>
              <p>Edit Project</p>
              <button
                className={styles.close}
                type="button"
                onClick={() => closeModal(variant)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className={styles.image}>
              <Image src={robot} alt="robot" />
            </div>
            <input
              className={styles.input}
              type="text"
              name="title"
              placeholder="Title"
              required
            />
            <input
              className={styles.input}
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              required
            />
            <input
              className={styles.input}
              type="date"
              name="date"
              placeholder="Expires"
              required
            />
            <input
              className={styles.input}
              type="url"
              name="imageURL"
              placeholder="Image URL"
              required
            />
            <textarea
              className={classNames(styles.input, styles.textArea)}
              name="description"
              placeholder="Description"
              required
            />
            <Button>Update Project</Button>
          </form>
        </div>
      </div>
    );
  }

  if (variant === 'back') {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <form className={styles.form}>
            <div className={styles.row}>
              <p>Project Title</p>
              <button
                className={styles.close}
                type="button"
                onClick={() => closeModal(variant)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className={styles.image}>
              <Image src={robot} alt="robot" />
            </div>
            <input
              className={styles.input}
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              required
            />
            <Button>Back Project</Button>
          </form>
        </div>
      </div>
    );
  }

  if (variant === 'delete') {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <form className={styles.form}>
            <div className={styles.row}>
              <p>Project Title</p>
              <button
                className={styles.close}
                type="button"
                onClick={() => closeModal(variant)}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className={styles.image}>
              <Image src={robot} alt="robot" />
            </div>
            <div className={styles.warning}>
              <p>Are you sure you wish to proceed?</p>
              <span>This action is irreversable.</span>
            </div>
            <Button color="red">Delete Project</Button>
          </form>
        </div>
      </div>
    );
  }
};

export default ProjectModal;
