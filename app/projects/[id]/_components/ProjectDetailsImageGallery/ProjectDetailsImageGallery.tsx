'use client';

import { useState } from 'react';

import { useProjectPageContext } from '@/app/hooks/useProjectPageContext';
import ProjectDetailsImageGalleryMainImage from '../ProjectDetailsImageGalleryMainImage/ProjectDetailsImageGalleryMainImage';
import ProjectDetailsImageGalleryImageCards from '../ProjectDetailsImageGalleryImageCards/ProjectDetailsImageGalleryImageCards';

import styles from './ProjectDetailsImageGallery.module.scss';

const ProjectDetailsImageGallery = () => {
  const { project, blurDataUrls } = useProjectPageContext();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { imageUrls } = project;

  const handleImageSelect = (selectedImageIndex: number) =>
    setSelectedImageIndex(selectedImageIndex);

  return (
    <div className={styles.imageGallery}>
      {imageUrls.length > 1 && (
        <ProjectDetailsImageGalleryImageCards
          imageUrls={imageUrls}
          selectedImageIndex={selectedImageIndex}
          blurDataUrls={blurDataUrls}
          onSelect={handleImageSelect}
        />
      )}

      <ProjectDetailsImageGalleryMainImage
        key={selectedImageIndex}
        imageUrls={imageUrls}
        selectedImageIndex={selectedImageIndex}
        blurDataUrls={blurDataUrls}
      />
    </div>
  );
};

export default ProjectDetailsImageGallery;
