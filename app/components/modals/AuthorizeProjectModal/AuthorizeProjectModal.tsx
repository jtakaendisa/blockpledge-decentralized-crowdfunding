import { useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

import { Project, useModalStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';

import styles from '../modal.module.scss';

interface Props {
  project: Project;
}

interface AuthorizeFormInputs {
  decision: 'accept' | 'reject';
  reason: string;
}

const AuthorizeProjectModal = ({ project }: Props) => {
  const closeModal = useModalStore((s) => s.setIsOpen);
  const { acceptProject, rejectProject } = useBlockchain();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitSuccessful },
  } = useForm<AuthorizeFormInputs>({
    defaultValues: {
      decision: 'accept',
      reason: '',
    },
  });

  const watchShowReason = watch('decision');

  const onSubmit: SubmitHandler<AuthorizeFormInputs> = async (data) => {
    const { decision, reason } = data;

    if (decision === 'accept') {
      await acceptProject(project.id);
    } else {
      await rejectProject(project.id, reason);
    }

    closeModal('authorize');
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
              onClick={() => closeModal('authorize')}
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
          <fieldset>
            <legend>Accept or Reject the Project</legend>

            <div>
              <label htmlFor="accept">Accept Project</label>
              <input
                id="accept"
                type="radio"
                value="accept"
                {...register('decision')}
              />
            </div>

            <div>
              <label htmlFor="reject">Reject Project</label>
              <input
                id="reject"
                type="radio"
                value="reject"
                {...register('decision')}
              />
            </div>
          </fieldset>
          {watchShowReason === 'reject' && (
            <textarea
              className={classNames(styles.input, styles.textArea)}
              placeholder="Reason for rejection"
              {...register('reason', { required: true })}
            />
          )}
          <Button>Submit Decision</Button>
        </form>
      </div>
    </div>
  );
};

export default AuthorizeProjectModal;
