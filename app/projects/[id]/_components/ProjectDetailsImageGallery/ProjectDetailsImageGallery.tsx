import { useState } from 'react';

import { useProjectPageState } from '@/app/contexts/ProjectPageContext';
import ProjectDetailsImageGalleryMainImage from '../ProjectDetailsImageGalleryMainImage/ProjectDetailsImageGalleryMainImage';
import ProjectDetailsImageGalleryImageCards from '../ProjectDetailsImageGalleryImageCards/ProjectDetailsImageGalleryImageCards';

import styles from './ProjectDetailsImageGallery.module.scss';

const ProjectDetailsImageGallery = () => {
  const { project, blurDataURLs } = useProjectPageState(['project', 'blurDataURLs']);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { imageURLs } = project.get;

  const handleImageSelect = (selectedImageIndex: number) =>
    setSelectedImageIndex(selectedImageIndex);

  return (
    <div className={styles.imageGallery}>
      {imageURLs.length > 1 && (
        <ProjectDetailsImageGalleryImageCards
          imageURLs={imageURLs}
          selectedImageIndex={selectedImageIndex}
          blurDataURLs={blurDataURLs.get}
          onSelect={handleImageSelect}
        />
      )}

      <ProjectDetailsImageGalleryMainImage
        key={selectedImageIndex}
        imageURLs={imageURLs}
        selectedImageIndex={selectedImageIndex}
        blurDataURLs={blurDataURLs.get}
      />
    </div>
  );
};

export default ProjectDetailsImageGallery;
