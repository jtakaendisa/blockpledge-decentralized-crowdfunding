import { useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { Project } from '@/app/entities';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';
import xmarkSVG from '@/public/icons/xmark.svg';

import styles from '../modal.module.scss';

interface Props {
  project: Project | null;
  closeModal: () => void;
}

interface AuthorizeFormInputs {
  decision: 'accept' | 'reject';
  reason: string;
}

const AuthorizeProjectModal = ({ project, closeModal }: Props) => {
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

  const onSubmit: SubmitHandler<AuthorizeFormInputs> = async ({ decision, reason }) => {
    if (!project) return;

    if (decision === 'accept') {
      await acceptProject(project.id);
      toast.success('Project has been accepted, changes will reflect momentarily.');
    } else {
      await rejectProject(project.id, reason);
      toast.success('Project has been rejected, changes will reflect momentarily.');
    }
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
            <button className={styles.close} type="button" onClick={() => closeModal()}>
              <Image src={xmarkSVG} alt="close" width={22} height={22} />
            </button>
          </div>
          <fieldset className={styles.formFieldset}>
            <legend>Accept or Reject the Project</legend>

            <div className={styles.formOption}>
              <label htmlFor="accept">Accept Project</label>
              <input
                id="accept"
                type="radio"
                value="accept"
                {...register('decision')}
              />
            </div>

            <div className={styles.formOption}>
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
