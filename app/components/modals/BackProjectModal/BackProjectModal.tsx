'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

import { Project, useAccountStore, useModalStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';

import styles from '../modal.module.scss';
import { backProjectFirebase } from '@/app/services/authService';

interface Props {
  project: Project;
}

export interface BackFormInputs {
  cost: string;
  comment: string;
}

const BackProjectModal = ({ project }: Props) => {
  const closeModal = useModalStore((s) => s.setIsOpen);
  const authUser = useAccountStore((s) => s.authUser);
  const { backProject } = useBlockchain();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<BackFormInputs>({
    defaultValues: {
      cost: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<BackFormInputs> = async ({ cost, comment }) => {
    await backProject(project.id, cost, comment);

    if (authUser) {
      await backProjectFirebase(authUser, project.id);
    }

    toast.success(
      'Thank you! Project backing has been received, changes will reflect momentarily.'
    );

    closeModal('back');
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
              className={styles.close}
              type="button"
              onClick={() => closeModal('back')}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className={styles.image}>
            <Image
              src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${project.imageURLs[0]}`}
              alt={project.title}
              fill
              sizes="20vw"
            />
          </div>
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
            type="text"
            placeholder="Comment (Optional)"
            {...register('comment')}
          />

          <Button>Back Project</Button>
        </form>
      </div>
    </div>
  );
};

export default BackProjectModal;
