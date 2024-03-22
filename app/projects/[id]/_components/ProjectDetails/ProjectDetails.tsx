'use client';

import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Identicon from 'react-hooks-identicons';
import { FaEthereum } from 'react-icons/fa';
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  XIcon,
  WhatsappIcon,
} from 'react-share';

import { Category, Project, statusMap, useAccountStore } from '@/app/store';
import { followProject } from '@/app/services/authService';
import { findDaysRemaining, truncateAccount } from '@/app/utils';
import EditProjectModal from '@/app/components/modals/EditProjectModal/EditProjectModal';
import DeleteProjectModal from '@/app/components/modals/DeleteProjectModal/DeleteProjectModal';
import BackProjectModal from '@/app/components/modals/BackProjectModal/BackProjectModal';
import AuthorizeProjectModal from '@/app/components/modals/AuthorizeProjectModal/AuthorizeProjectModal';
import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import Button from '@/app/components/Button/Button';
import { statusColorMap } from '@/app/components/ProjectsGrid/ProjectsGrid';
import linkSVG from '@/public/icons/link.svg';
import followSVG from '@/public/icons/follow.svg';
import followingSVG from '@/public/icons/following.svg';

import styles from './ProjectDetails.module.scss';

interface Props {
  project: Project;
  categories: Category[];
  updateFollowingStatus: () => void;
}

const TEST_URL = 'udemy.com';

const ProjectDetails = ({ project, categories, updateFollowingStatus }: Props) => {
  const {
    imageURLs,
    title,
    expiresAt,
    owner,
    backers,
    status,
    description,
    raised,
    cost,
    categoryId,
  } = project;

  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const [selectedImage, setSelectedImage] = useState(0);
  const [urlCopied, setUrlCopied] = useState(false);
  const [modalState, setModalState] = useState({
    backIsOpen: false,
    editIsOpen: false,
    deleteIsOpen: false,
    authorizeIsOpen: false,
  });

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;
  const isOwner = connectedAccount === owner;
  const isOpen = project.status === 0;
  const isPendingApproval = project.status === 5;
  const isFollowing = authUser?.following.includes(project.id);

  const { backIsOpen, editIsOpen, deleteIsOpen, authorizeIsOpen } = modalState;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy:', (error as Error).message);
    }
  };

  const handleFollowProject = async () => {
    if (!authUser) return;

    await followProject(authUser, project.id, isFollowing);
    updateFollowingStatus();
  };

  return (
    <section className={styles.mainContainer}>
      {imageURLs?.length && (
        <div className={styles.imageGallery}>
          <div className={styles.imageLarge}>
            <Image
              src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[selectedImage]}`}
              alt={title}
              fill
              sizes="30vw"
              priority
            />
          </div>
          {imageURLs.length > 1 && (
            <div className={styles.imageRow}>
              {imageURLs.map((image, idx) => (
                <div
                  key={image + idx}
                  className={classNames({
                    [styles.imageSmall]: true,
                    [styles.selected]: idx === selectedImage,
                  })}
                  onClick={() => setSelectedImage(idx)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image}`}
                    alt={title}
                    fill
                    sizes="10vw"
                    priority
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles.info}>
        <h5>{title}</h5>
        <small>{findDaysRemaining(expiresAt)}</small>
        <small>{categories.find((category) => category.id === categoryId)?.name}</small>
        <div className={styles.row}>
          <div className={styles.backings}>
            <Identicon string={owner} size={15} />
            <small>{truncateAccount(owner, 4, 4)}</small>
            <small>{backers} Backings</small>
          </div>
          <small className={styles[statusColorMap[status]]}>{statusMap[status]}</small>
        </div>
        <p>{description}</p>
        <ProgressBar progress={(raised / cost) * 100} />
        <div className={styles.row}>
          <small>{raised} ETH Raised</small>
          <div className={styles.etherTarget}>
            <FaEthereum />
            <small>{cost} ETH</small>
          </div>
        </div>
        <div className={styles.buttons}>
          {isPendingApproval && isAdmin && (
            <Button
              color="orange"
              onClick={() => setModalState({ ...modalState, authorizeIsOpen: true })}
            >
              Accept / Reject
            </Button>
          )}
          {isOpen && authUser && !isAdmin && !isOwner && (
            <Button onClick={() => setModalState({ ...modalState, backIsOpen: true })}>
              Back Project
            </Button>
          )}
          {isOpen && isOwner && (
            <>
              <Button
                color="gray"
                onClick={() => setModalState({ ...modalState, editIsOpen: true })}
              >
                Edit
              </Button>
              <Button
                color="red"
                onClick={() => setModalState({ ...modalState, deleteIsOpen: true })}
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <div className={styles.socials}>
          <button className={styles.linkButton} onClick={copyToClipboard}>
            <Image src={linkSVG} alt="link icon" width={28} height={28} />
            <span
              className={classNames({
                [styles.tooltip]: true,
                [styles.show]: urlCopied,
              })}
            >
              link copied
            </span>
          </button>
          <EmailShareButton url={TEST_URL}>
            <EmailIcon round size={48} />
          </EmailShareButton>
          <FacebookShareButton url={TEST_URL}>
            <FacebookIcon round size={48} />
          </FacebookShareButton>
          <TelegramShareButton url={TEST_URL}>
            <TelegramIcon round size={48} />
          </TelegramShareButton>
          <TwitterShareButton url={TEST_URL}>
            <XIcon round size={48} />
          </TwitterShareButton>
          <WhatsappShareButton url={TEST_URL}>
            <WhatsappIcon round size={48} />
          </WhatsappShareButton>
        </div>
        {authUser && (
          <button className={styles.followProject} onClick={handleFollowProject}>
            <Image
              src={isFollowing ? followingSVG : followSVG}
              alt="Follow Project"
              width={24}
              height={24}
            />
            <span>{isFollowing ? 'Following' : 'Follow this Project'}</span>
          </button>
        )}
      </div>
      {backIsOpen && (
        <BackProjectModal
          project={project}
          closeModal={() => setModalState({ ...modalState, backIsOpen: false })}
        />
      )}
      {editIsOpen && (
        <EditProjectModal
          project={project}
          closeModal={() => setModalState({ ...modalState, editIsOpen: false })}
        />
      )}
      {deleteIsOpen && (
        <DeleteProjectModal
          project={project}
          closeModal={() => setModalState({ ...modalState, deleteIsOpen: false })}
        />
      )}
      {authorizeIsOpen && (
        <AuthorizeProjectModal
          project={project}
          closeModal={() => setModalState({ ...modalState, authorizeIsOpen: false })}
        />
      )}
    </section>
  );
};

export default ProjectDetails;
