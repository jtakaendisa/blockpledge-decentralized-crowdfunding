import { useEffect } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { Project } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';
import xmarkSVG from '@/public/icons/xmark.svg';

import styles from '../modal.module.scss';

interface Props {
  project: Project | null;
  closeModal: () => void;
}

interface DeleteFormInputs {
  reason: string;
}

const DeleteProjectModal = ({ project, closeModal }: Props) => {
  const { deleteProject } = useBlockchain();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<DeleteFormInputs>({
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit: SubmitHandler<DeleteFormInputs> = async (data) => {
    if (!project) return;

    await deleteProject(project.id, data.reason);
    toast.success('Project has been deleted, changes will reflect momentarily.');
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
          <textarea
            className={classNames(styles.input, styles.textArea)}
            placeholder="Reason for deletion"
            {...register('reason', { required: true })}
          />
          <div className={styles.warning}>
            <p>Are you sure you wish to delete this project?</p>
            <span>This action is irreversable.</span>
          </div>
          <Button color="red">Delete Project</Button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
