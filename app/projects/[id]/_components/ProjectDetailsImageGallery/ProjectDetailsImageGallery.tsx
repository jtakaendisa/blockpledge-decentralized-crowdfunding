import { useState } from 'react';

import { useProjectPageContext } from '@/app/hooks/useProjectPageContext';
import ProjectDetailsImageGalleryMainImage from '../ProjectDetailsImageGalleryMainImage/ProjectDetailsImageGalleryMainImage';
import ProjectDetailsImageGalleryImageCards from '../ProjectDetailsImageGalleryImageCards/ProjectDetailsImageGalleryImageCards';

import styles from './ProjectDetailsImageGallery.module.scss';

const ProjectDetailsImageGallery = () => {
  const { project, blurDataUrls } = useProjectPageContext();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { imageURLs } = project;

  const handleImageSelect = (selectedImageIndex: number) =>
    setSelectedImageIndex(selectedImageIndex);

  return (
    <div className={styles.imageGallery}>
      {imageURLs.length > 1 && (
        <ProjectDetailsImageGalleryImageCards
          imageURLs={imageURLs}
          selectedImageIndex={selectedImageIndex}
          blurDataURLs={blurDataUrls}
          onSelect={handleImageSelect}
        />
      )}

      <ProjectDetailsImageGalleryMainImage
        key={selectedImageIndex}
        imageURLs={imageURLs}
        selectedImageIndex={selectedImageIndex}
        blurDataURLs={blurDataUrls}
      />
    </div>
  );
};

export default ProjectDetailsImageGallery;
