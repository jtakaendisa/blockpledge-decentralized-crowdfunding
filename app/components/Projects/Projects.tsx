'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Identicon from 'react-hooks-identicons';
import { FaEthereum } from 'react-icons/fa';

import { useProjectStore, Project, statusMap } from '@/app/store';
import { findDaysRemaining, truncateAccount } from '@/app/utils';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

import styles from './Projects.module.scss';

interface ProjectsProps {
  pendingApproval?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
  5: 'orange',
};

const Projects = ({ pendingApproval }: ProjectsProps) => {
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const allProjects = useProjectStore((s) => s.projects);
  const end = useProjectStore((s) => s.end);
  const setEnd = useProjectStore((s) => s.setEnd);
  const { loadProjects } = useBlockchain();
  const count = 12;

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pendingApproval) {
      setDisplayedProjects(allProjects.filter((project) => project.status === 5));
    } else {
      setDisplayedProjects(allProjects.slice(0, end));
    }
  }, [allProjects, end, pendingApproval]);

  if (!allProjects) return null;

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {!pendingApproval && (
        <div className={styles.buttonContainer}>
          {end < allProjects.length && (
            <Button onClick={() => setEnd(count)}>Load More</Button>
          )}
        </div>
      )}
    </section>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, owner, title, imageURLs, backers, expiresAt, raised, cost, status } =
    project;

  return (
    <div className={styles.card}>
      <Link href={`/projects/${id}`} className={styles.link}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[0]}`}
            alt={title}
            fill
            sizes="10vw"
          />
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
            <small className={styles[statusColorMap[status]]}>
              {statusMap[status]}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Projects;
