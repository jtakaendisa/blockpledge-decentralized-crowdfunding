'use client';

import { useState } from 'react';
import Image from 'next/image';
import Identicon from 'react-hooks-identicons';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';
import classNames from 'classnames';

import {
  Category,
  Project,
  statusMap,
  useAccountStore,
  useProjectStore,
} from '@/app/store';
import { followProject } from '@/app/services/authService';
import { findDaysRemaining, truncateAccount } from '@/app/utils';
import { Media, MediaContextProvider } from '@/app/media';
import { statusColorMap } from '@/app/constants';
import ProjectDetailsImageGallery from '../ProjectDetailsImageGallery/ProjectDetailsImageGallery';
import ProgressBar from '@/app/components/ProjectProgressBar/ProjectProgressBar';
import Button from '@/app/components/Button/Button';
import EditProjectModal from '@/app/components/modals/EditProjectModal/EditProjectModal';
import DeleteProjectModal from '@/app/components/modals/DeleteProjectModal/DeleteProjectModal';
import BackProjectModal from '@/app/components/modals/BackProjectModal/BackProjectModal';
import AuthorizeProjectModal from '@/app/components/modals/AuthorizeProjectModal/AuthorizeProjectModal';
import Following from '@/app/components/categories/icons/Following';
import Follow from '@/app/components/categories/icons/Follow';
import Link from '@/app/components/categories/icons/Link';
import Facebook from '@/app/components/categories/icons/Facebook';
import Twitter from '@/app/components/categories/icons/Twitter';
import Email from '@/app/components/categories/icons/Email';
import ethereumSVG from '@/public/icons/ethereum.svg';

import styles from './ProjectDetails.module.scss';

interface Props {
  project: Project;
  categories: Category[];
}

const PLACEHOLDER_URL = 'https://github.com/jtakaendisa';

const ProjectDetails = ({ project, categories }: Props) => {
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
  const setUpdatingAuthUserData = useAccountStore((s) => s.setUpdatingAuthUserData);
  const updatingFollowStatus = useProjectStore((s) => s.updatingFollowStatus);
  const setUpdatingFollowStatus = useProjectStore((s) => s.setUpdatingFollowStatus);
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

    setUpdatingFollowStatus(true);
    await followProject(authUser, project.id, isFollowing);
    setUpdatingAuthUserData();
  };

  const [length, unit] = findDaysRemaining(expiresAt);

  return (
    <MediaContextProvider>
      <Media greaterThanOrEqual="cus">
        <section className={styles.mainContainer}>
          {!!imageURLs?.length && (
            <ProjectDetailsImageGallery imageURLs={imageURLs} title={title} />
          )}
          <div className={styles.info}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.category}>
              {categories.find((category) => category.id === categoryId)?.name}
            </span>
            <div className={styles.row}>
              <div className={styles.account}>
                <Identicon string={owner} size={20} />
                <span>{truncateAccount(owner, 4, 4)}</span>
              </div>
              <span
                className={classNames(styles[statusColorMap[status]], styles.status)}
              >
                {statusMap[status]}
              </span>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.row}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>{backers}</span>
                  <span>{backers > 1 ? 'backers' : 'backer'}</span>
                </div>
                <div className={styles.stat}>
                  <span>{length}</span>
                  <span>{unit}</span>
                </div>
              </div>
              <div className={styles.policy}>
                <span>ALL OR NOTHING</span>
                <p>This project will only be funded if it reaches its goal.</p>
              </div>
            </div>
            <ProgressBar cost={cost} raised={raised} />
            <div className={styles.row}>
              <span>{raised} ETH Raised</span>
              <div className={styles.etherTarget}>
                <Image src={ethereumSVG} alt="ethereum" width={18} height={18} />
                <span>{cost} ETH</span>
              </div>
            </div>
            <div className={classNames(styles.row, styles.spacer)}>
              <div className={styles.buttons}>
                {isPendingApproval && isAdmin && (
                  <Button
                    color="orange"
                    onClick={() =>
                      setModalState({ ...modalState, authorizeIsOpen: true })
                    }
                  >
                    Accept / Reject
                  </Button>
                )}
                {isOpen && authUser && !isAdmin && !isOwner && (
                  <Button
                    onClick={() => setModalState({ ...modalState, backIsOpen: true })}
                  >
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
                      onClick={() =>
                        setModalState({ ...modalState, deleteIsOpen: true })
                      }
                    >
                      Delete
                    </Button>
                  </>
                )}
                {authUser && !isOwner && (
                  <Button
                    color={isFollowing ? 'green' : 'orange'}
                    inverted
                    onClick={handleFollowProject}
                    disabled={updatingFollowStatus}
                  >
                    <div className={styles.follow}>
                      {isFollowing ? <Following /> : <Follow />}
                      {updatingFollowStatus ? (
                        'Loading...'
                      ) : (
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      )}
                    </div>
                  </Button>
                )}
              </div>
              <div className={styles.socials}>
                <FacebookShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Facebook />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Twitter />
                  </div>
                </TwitterShareButton>
                <EmailShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Email />
                  </div>
                </EmailShareButton>
                <button
                  className={classNames(styles.socialButton, styles.linkButton)}
                  onClick={copyToClipboard}
                >
                  <Link />
                  <span
                    className={classNames({
                      [styles.tooltip]: true,
                      [styles.show]: urlCopied,
                    })}
                  >
                    link copied
                  </span>
                </button>
              </div>
            </div>
          </div>
          {authorizeIsOpen && (
            <AuthorizeProjectModal
              project={project}
              closeModal={() =>
                setModalState({ ...modalState, authorizeIsOpen: false })
              }
            />
          )}
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
        </section>
      </Media>
      {/* <Media lessThan="cus">
        <section className={styles.mobileMainContainer}>
          {imageURLs?.length && (
            <div className={styles.imageGallery}>
              <div className={styles.imageLarge}>
                <Image src={largeImageUrl} alt={title} fill sizes="80vw" priority />
              </div>
              {imageURLs.length > 1 && (
                <div className={styles.imageColumn}>
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
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.category}>
              {categories.find((category) => category.id === categoryId)?.name}
            </span>
            <div className={styles.row}>
              <div className={styles.account}>
                <Identicon string={owner} size={20} />
                <span>{truncateAccount(owner, 4, 4)}</span>
              </div>
              <span
                className={classNames(styles[statusColorMap[status]], styles.status)}
              >
                {statusMap[status]}
              </span>
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.row}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>{backers}</span>
                  <span>{backers > 1 ? 'backers' : 'backer'}</span>
                </div>
                <div className={styles.stat}>
                  <span>{length}</span>
                  <span>{unit}</span>
                </div>
              </div>
              <div className={styles.policy}>
                <span>ALL OR NOTHING</span>
                <p>This project will only be funded if it reaches its goal.</p>
              </div>
            </div>
            <ProgressBar progress={(raised / cost) * 100} />
            <div className={styles.row}>
              <span>{raised} ETH Raised</span>
              <div className={styles.etherTarget}>
                <Image src={ethereumSVG} alt="ethereum" width={18} height={18} />
                <span>{cost} ETH</span>
              </div>
            </div>
            <div className={classNames(styles.row, styles.spacer)}>
              <div className={styles.buttons}>
                {isPendingApproval && isAdmin && (
                  <Button
                    color="orange"
                    onClick={() =>
                      setModalState({ ...modalState, authorizeIsOpen: true })
                    }
                  >
                    Accept / Reject
                  </Button>
                )}
                {isOpen && authUser && !isAdmin && !isOwner && (
                  <Button
                    onClick={() => setModalState({ ...modalState, backIsOpen: true })}
                  >
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
                      onClick={() =>
                        setModalState({ ...modalState, deleteIsOpen: true })
                      }
                    >
                      Delete
                    </Button>
                  </>
                )}
                {authUser && !isOwner && (
                  <Button
                    color={isFollowing ? 'green' : 'orange'}
                    inverted
                    onClick={handleFollowProject}
                    disabled={updatingFollowStatus}
                  >
                    <div className={styles.follow}>
                      {isFollowing ? <Following /> : <Follow />}
                      {updatingFollowStatus ? (
                        'Loading...'
                      ) : (
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      )}
                    </div>
                  </Button>
                )}
              </div>
              <div className={styles.socials}>
                <FacebookShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Facebook />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Twitter />
                  </div>
                </TwitterShareButton>
                <EmailShareButton url={PLACEHOLDER_URL}>
                  <div className={styles.socialButton}>
                    <Email />
                  </div>
                </EmailShareButton>
                <button
                  className={classNames(styles.socialButton, styles.linkButton)}
                  onClick={copyToClipboard}
                >
                  <Link />
                  <span
                    className={classNames({
                      [styles.tooltip]: true,
                      [styles.show]: urlCopied,
                    })}
                  >
                    link copied
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Media> */}
      <div className={styles.divider} />
    </MediaContextProvider>
  );
};

export default ProjectDetails;
