import FormImageUploaderPreviewCard from '../FormImageUploaderPreviewCard/FormImageUploaderPreviewCard';

import styles from './FormImageUploaderPreview.module.scss';

interface Props {
  images: File[];
}

const FormImageUploaderPreview = ({ images }: Props) => {
  return (
    <div className={styles.imageUploaderPreview}>
      {images.map((image, index) => (
        <FormImageUploaderPreviewCard key={image.name} image={image} index={index} />
      ))}
    </div>
  );
};

export default FormImageUploaderPreview;
