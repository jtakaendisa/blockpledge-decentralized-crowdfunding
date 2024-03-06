'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

import { ModalVariant, Project, useModalStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import { convertToTimestamp } from '@/app/utils';
import Button from '../Button/Button';
import newProject from '@/public/images/new-project.jpg';

import styles from './ProjectModal.module.scss';

interface Props {
  variant: ModalVariant;
  project?: Project;
}

export interface FormInputs {
  id?: number;
  title: string;
  cost: string;
  expiresAt: Date | string | number;
  imageURL: string;
  description: string;
}

const submitButtonMap = {
  add: 'Submit Project',
  back: 'Back Project',
  edit: 'Update Project',
  delete: 'Delete Project',
};

const ProjectModal = ({ variant, project }: Props) => {
  const modalTitleMap = {
    add: 'Add Project',
    back: project?.title,
    edit: 'Edit Project',
    delete: project?.title,
  };

  const router = useRouter();
  const closeModal = useModalStore((s) => s.setIsOpen);
  const { createProject, updateProject, deleteProject, backProject } = useBlockchain();

  const defaultValues =
    project && variant === 'edit'
      ? {
          title: project.title,
          description: project.description,
          imageURL: project.imageURL,
          cost: project.cost.toString(),
          expiresAt: project.date,
        }
      : {
          title: '',
          description: '',
          imageURL: '',
          cost: '',
          expiresAt: '',
        };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormInputs>({ defaultValues: defaultValues });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    data.expiresAt = convertToTimestamp(data.expiresAt as string);

    switch (variant) {
      case 'add':
        await createProject(data);
        toast.success(
          'Project created successfully, changes will reflect momentarily.'
        );
      case 'back':
        await backProject(project!.id, data.cost);
        toast.success(
          'Thank you! Project backing has been received, changes will reflect momentarily.'
        );
      case 'edit':
        await updateProject({ ...data, id: project!.id });
        toast.success(
          'Project updated successfully, changes will reflect momentarily.'
        );
      case 'delete':
        await deleteProject(project!.id);
        toast.success(
          'Project deleted successfully, changes will reflect momentarily.'
        );
        router.push('/');
    }

    closeModal(variant);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const InputFields = () => {
    switch (variant) {
      case 'add':
        return (
          <>
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
          </>
        );
      case 'back':
        return (
          <input
            className={styles.input}
            type="number"
            step={0.01}
            min={0.01}
            placeholder="Amount (ETH)"
            {...register('cost', { required: true })}
          />
        );
      case 'edit':
        return (
          <>
            <input
              className={styles.input}
              type="text"
              placeholder="Title"
              {...register('title', { required: true })}
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
          </>
        );
      case 'delete':
        return (
          <div className={styles.warning}>
            <p>Are you sure you wish to delete this project?</p>
            <span>This action is irreversable.</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.row}>
            <p>{modalTitleMap[variant]}</p>
            <button
              className={styles.close}
              type="button"
              onClick={() => closeModal(variant)}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className={styles.image}>
            {variant === 'add' ? (
              <Image src={newProject} alt="Create a Project" />
            ) : (
              project && (
                <Image src={project.imageURL} alt={project.title} fill sizes="20vw" />
              )
            )}
          </div>
          <InputFields />
          <Button color={variant === 'delete' ? 'red' : undefined}>
            {submitButtonMap[variant]}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
