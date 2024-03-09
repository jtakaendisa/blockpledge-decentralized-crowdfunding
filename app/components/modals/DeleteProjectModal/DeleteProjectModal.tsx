import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

import { Project, useModalStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../../Button/Button';

import styles from '../modal.module.scss';

interface Props {
  project: Project;
}

const DeleteProjectModal = ({ project }: Props) => {
  const router = useRouter();
  const closeModal = useModalStore((s) => s.setIsOpen);
  const { deleteProject } = useBlockchain();

  const handleSubmit = async () => {
    await deleteProject(project.id);
    toast.success('Project deleted successfully, changes will reflect momentarily.');
    closeModal('delete');
    router.push('/');
  };

  if (!project) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <p>{project.title}</p>
            <button
              className={styles.close}
              type="button"
              onClick={() => closeModal('delete')}
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
