import FormImageUploaderPreviewCard from '../FormImageUploaderPreviewCard/FormImageUploaderPreviewCard';

import styles from './FormImageUploaderPreview.module.scss';

interface Props {
  images: (File | string)[];
}

const FormImageUploaderPreview = ({ images }: Props) => {
  return (
    <div className={styles.imageUploaderPreview}>
      {images.map((image, index) => (
        <FormImageUploaderPreviewCard key={index} image={image} index={index} />
      ))}
    </div>
  );
};

export default FormImageUploaderPreview;
