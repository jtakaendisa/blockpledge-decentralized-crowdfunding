import Image from 'next/image';

import { truncateText } from '@/app/utils';
import defaultBlurDataURL from '@/public/images/defaultBlurDataURL.png';

import styles from './FormImageUploaderPreviewCard.module.scss';

interface Props {
  image: File | string;
  index: number;
}

const FormImageUploaderPreviewCard = ({ image, index }: Props) => {
  const isUrl = typeof image === 'string';
  const imageUrl = isUrl
    ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image}`
    : URL.createObjectURL(image);

  return (
    <div className={styles.previewCard}>
      <div className={styles.image}>
        <Image
          src={imageUrl}
          alt={`Preview ${index}`}
          width={54}
          height={54}
          placeholder="blur"
          blurDataURL={defaultBlurDataURL.blurDataURL}
        />
      </div>
      <span className={styles.name}>
        {truncateText(isUrl ? `Preview ${index + 1}` : image.name, 65, true)}
      </span>
    </div>
  );
};

export default FormImageUploaderPreviewCard;
