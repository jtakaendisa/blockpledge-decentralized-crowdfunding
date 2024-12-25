import { useState } from 'react';

import ProjectDetailsImageGalleryMainImage from '../ProjectDetailsImageGalleryMainImage/ProjectDetailsImageGalleryMainImage';
import ProjectDetailsImageGalleryImageCards from '../ProjectDetailsImageGalleryImageCards/ProjectDetailsImageGalleryImageCards';

import styles from './ProjectDetailsImageGallery.module.scss';

interface Props {
  imageURLs: string[];
  title: string;
  blurDataURLs: string[];
}

const hasMultipleImages = (imageURLs: string[]) => imageURLs.length > 1;

const ProjectDetailsImageGallery = ({ imageURLs, title, blurDataURLs }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (selectedImageIndex: number) =>
    setSelectedImageIndex(selectedImageIndex);

  return (
    <div className={styles.imageGallery}>
      {hasMultipleImages(imageURLs) && (
        <ProjectDetailsImageGalleryImageCards
          imageURLs={imageURLs}
          selectedImageIndex={selectedImageIndex}
          title={title}
          onSelect={handleImageSelect}
        />
      )}

      <ProjectDetailsImageGalleryMainImage
        key={selectedImageIndex}
        imageURLs={imageURLs}
        selectedImageIndex={selectedImageIndex}
        title={title}
        blurDataURLs={blurDataURLs}
      />
    </div>
  );
};

export default ProjectDetailsImageGallery;
