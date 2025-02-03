import ProjectDetailsImageGalleryImageCard from '../ProjectDetailsImageGalleryImageCard/ProjectDetailsImageGalleryImageCard';
import defaultBlurDataUrl from '@/public/images/defaultBlurDataURL.png';

import styles from './ProjectDetailsImageGalleryImageCards.module.scss';

interface Props {
  imageUrls: string[];
  selectedImageIndex: number;
  blurDataUrls: string[];
  onSelect: (index: number) => void;
}

const ProjectDetailsImageGalleryImageCards = ({
  imageUrls,
  selectedImageIndex,
  blurDataUrls,
  onSelect,
}: Props) => {
  return (
    <div className={styles.imageCards}>
      {imageUrls.map((imageUrl, index) => (
        <ProjectDetailsImageGalleryImageCard
          key={imageUrl}
          imageURL={imageUrl}
          index={index}
          selectedImageIndex={selectedImageIndex}
          blurDataURL={
            blurDataUrls ? blurDataUrls[index] : defaultBlurDataUrl.blurDataURL!
          }
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectDetailsImageGalleryImageCards;
