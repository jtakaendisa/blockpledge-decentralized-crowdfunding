import { useState } from 'react';

export const useProjectModals = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAuthorizeProjectModalOpen, setIsAuthorizeProjectModalOpen] = useState(false);
  const [isBackProjectModalOpen, setIsBackProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);

  const toggleAddProjectModalState = () => setIsAddProjectModalOpen((prev) => !prev);
  const toggleAuthorizeProjectModalState = () =>
    setIsAuthorizeProjectModalOpen((prev) => !prev);
  const toggleBackProjectModalState = () => setIsBackProjectModalOpen((prev) => !prev);
  const toggleEditProjectState = () => setIsEditProjectModalOpen((prev) => !prev);
  const toggleDeleteProjectState = () => setIsDeleteProjectModalOpen((prev) => !prev);

  return {
    isAddProjectModalOpen,
    isAuthorizeProjectModalOpen,
    isBackProjectModalOpen,
    isEditProjectModalOpen,
    isDeleteProjectModalOpen,
    toggleAddProjectModalState,
    toggleAuthorizeProjectModalState,
    toggleBackProjectModalState,
    toggleEditProjectState,
    toggleDeleteProjectState,
  };
};
