import ProjectDetailsImageGalleryImageCard from '../ProjectDetailsImageGalleryImageCard/ProjectDetailsImageGalleryImageCard';

import styles from './ProjectDetailsImageGalleryImageCards.module.scss';

interface Props {
  imageURLs: string[];
  selectedImageIndex: number;
  title: string;
  onSelect: (index: number) => void;
}

const ProjectDetailsImageGalleryImageCards = ({
  imageURLs,
  selectedImageIndex,
  title,
  onSelect,
}: Props) => {
  return (
    <div className={styles.imageCards}>
      {imageURLs.map((imageURL, index) => (
        <ProjectDetailsImageGalleryImageCard
          key={imageURL}
          imageURL={imageURL}
          index={index}
          selectedImageIndex={selectedImageIndex}
          title={title}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectDetailsImageGalleryImageCards;
