'use client';

import { useEffect, useState } from 'react';
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

import {
  statusMap,
  useAccountStore,
  useModalStore,
  useProjectStore,
} from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
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

const TEST_URL = 'udemy.com';

const ProjectDetails = () => {
  const { listenForProjectPayOut } = useBlockchain();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const project = useProjectStore((s) => s.project);
  const categories = useProjectStore((s) => s.categories);
  const backIsOpen = useModalStore((s) => s.backIsOpen);
  const editIsOpen = useModalStore((s) => s.editIsOpen);
  const deleteIsOpen = useModalStore((s) => s.deleteIsOpen);
  const authorizeIsOpen = useModalStore((s) => s.authorizeIsOpen);
  const setIsOpen = useModalStore((s) => s.setIsOpen);
  const [selectedImage, setSelectedImage] = useState(0);
  const [urlCopied, setUrlCopied] = useState(false);
  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;
  const isOpen = project.status === 0;
  const isFollowing = authUser?.following.includes(project.id);

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleFollowProject = async () => {
    if (!authUser) return;

    await followProject(authUser, project.id, isFollowing);
  };

  useEffect(() => {
    const fetchData = async () => {
      await listenForProjectPayOut();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return null;

  return (
    <section className={styles.mainContainer}>
      {imageURLs?.length && (
        <div className={styles.imageGallery}>
          <div className={styles.imageLarge}>
            <Image
              src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageURLs[selectedImage]}`}
              alt={title}
              fill
              sizes="70vw"
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
          {isAdmin && !isOpen && (
            <Button color="orange" onClick={() => setIsOpen('authorize')}>
              Accept / Reject
            </Button>
          )}
          {!isAdmin && connectedAccount !== owner && (
            <Button onClick={() => setIsOpen('back')}>Back Project</Button>
          )}
          {connectedAccount === owner && (
            <>
              {status === 0 && (
                <Button color="gray" onClick={() => setIsOpen('edit')}>
                  Edit
                </Button>
              )}
              {status !== 5 && (
                <Button color="red" onClick={() => setIsOpen('delete')}>
                  Delete
                </Button>
              )}
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
        <button className={styles.followProject} onClick={handleFollowProject}>
          <Image
            src={isFollowing ? followingSVG : followSVG}
            alt="Follow Project"
            width={24}
            height={24}
          />
          <span>{isFollowing ? 'Following' : 'Follow this Project'}</span>
        </button>
      </div>
      {backIsOpen && <BackProjectModal project={project} />}
      {editIsOpen && <EditProjectModal project={project} />}
      {deleteIsOpen && <DeleteProjectModal project={project} />}
      {authorizeIsOpen && <AuthorizeProjectModal project={project} />}
    </section>
  );
};

export default ProjectDetails;
