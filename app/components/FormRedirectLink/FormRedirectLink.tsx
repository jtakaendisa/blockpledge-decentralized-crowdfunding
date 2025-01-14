import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

import styles from './FormRedirectLink.module.scss';

interface Props {
  message: string;
  href: Url;
  linkText: string;
}

const FormRedirectLink = ({ message, href, linkText }: Props) => {
  return (
    <p className={styles.redirectLink}>
      {message} <Link href={href}>{linkText}</Link>
    </p>
  );
};

export default FormRedirectLink;
