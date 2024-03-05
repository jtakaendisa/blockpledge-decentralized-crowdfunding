'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Identicon from 'react-hooks-identicons';

import { useProjectStore, Project } from '@/app/store';
import { truncateAccount } from '@/app/utils';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

import styles from './Projects.module.scss';

interface ProjectCardProps {
  project: Project;
}

const statusMap = {
  0: 'OPEN',
  1: 'APPROVED',
  2: 'REVERTED',
  3: 'DELETED',
  4: 'PAIDOUT',
} as const;

const Projects = () => {
  const { loadProjects } = useBlockchain();
  const projects = useProjectStore((s) => s.projects);

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button>Load More</Button>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, owner, title, imageURL, backers, status } = project;

  return (
    <div className={styles.card}>
      <Link href={`/projects/${id}`} className={styles.link}>
        <div className={styles.image}>
          <Image src={imageURL} alt={title} fill />
        </div>
        <div className={styles.info}>
          <h5>{title}</h5>
          <div className={styles.ownerDetails}>
            <Identicon string={owner} size={15} />
            <small>{truncateAccount(owner, 4, 4)}</small>
          </div>
          <small className={styles.remainingTime}>2 days left</small>
          <ProgressBar progress={50} />
          <div className={styles.backingInfo}>
            <small>{backers} Backers</small>
            <small>{statusMap[status]}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Projects;
