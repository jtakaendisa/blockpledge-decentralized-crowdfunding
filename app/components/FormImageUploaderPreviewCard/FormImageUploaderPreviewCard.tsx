import Image from 'next/image';

import { truncateText } from '@/app/utils';
import defaultBlurDataURL from '@/public/images/defaultBlurDataURL.png';

import styles from './FormImageUploaderPreviewCard.module.scss';

interface Props {
  image: File;
  index: number;
}

const FormImageUploaderPreviewCard = ({ image, index }: Props) => {
  return (
    <div className={styles.previewCard}>
      <div className={styles.image}>
        <Image
          src={URL.createObjectURL(image)}
          alt={`Preview ${index}`}
          width={54}
          height={54}
          placeholder="blur"
          blurDataURL={defaultBlurDataURL.blurDataURL}
        />
      </div>
      <span className={styles.name}>{truncateText(image.name, 65, true)}</span>
    </div>
  );
};

export default FormImageUploaderPreviewCard;
