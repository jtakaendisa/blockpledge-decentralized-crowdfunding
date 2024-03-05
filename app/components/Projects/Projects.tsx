'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Identicon from 'react-hooks-identicons';
import { FaEthereum } from 'react-icons/fa';

import { useProjectStore, Project } from '@/app/store';
import { findDaysRemaining, truncateAccount } from '@/app/utils';
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
  const [end, setEnd] = useState(1);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const allProjects = useProjectStore((s) => s.projects);
  const { loadProjects } = useBlockchain();
  const count = 1;

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisplayedProjects(allProjects.slice(0, end));
  }, [allProjects, end]);

  const handleLoadMore = () => {
    setEnd((prev) => prev + count);
  };

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {end < allProjects.length && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, owner, title, imageURL, backers, expiresAt, raised, cost, status } =
    project;

  return (
    <div className={styles.card}>
      <Link href={`/projects/${id}`} className={styles.link}>
        <div className={styles.image}>
          <Image src={imageURL} alt={title} fill sizes="20vw" />
        </div>
        <div className={styles.info}>
          <h5>{title}</h5>
          <div className={styles.ownerDetails}>
            <Identicon string={owner} size={15} />
            <small>{truncateAccount(owner, 4, 4)}</small>
          </div>
          <small className={styles.remainingTime}>{findDaysRemaining(expiresAt)}</small>
          <ProgressBar progress={(raised / cost) * 100} />
          <div className={styles.row}>
            <small>{raised} ETH Raised</small>
            <small className={styles.cost}>
              <FaEthereum />
              <span>{cost} ETH</span>
            </small>
          </div>
          <div className={styles.backingInfo}>
            <small>
              {backers} {backers === 1 ? 'Backer' : 'Backers'}
            </small>
            <small>{statusMap[status]}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Projects;
