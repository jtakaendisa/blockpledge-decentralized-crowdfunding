import { colors } from '@/app/constants';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import FlipButton from '../FlipButton/FlipButton';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';

import styles from './ErrorFallback.module.scss';

interface Props {
  error: Error;
}

const { orange } = colors;

const ErrorFallback = ({ error }: Props) => {
  const { name, message } = error;

  const { animatePageOut } = usePageNavigation();

  const handlePageReload = () => window.location.reload();

  return (
    <div className={styles.fallback}>
      <div className={styles.container}>
        <h5 className={styles.errorType}>The page failed to initialize with {name}:</h5>
        <VerticalSpacer />

        <p className={styles.errorMessage}>{message}</p>
        <VerticalSpacer height={40} />

        <SpaceBetweenRow>
          <FlipButton onClick={handlePageReload}>Retry?</FlipButton>
          <FlipButton
            onClick={() => animatePageOut('/')}
            textColor1={orange}
            backgroundColor2={orange}
            borderColor={orange}
          >
            Return to Home
          </FlipButton>
        </SpaceBetweenRow>
      </div>
    </div>
  );
};

export default ErrorFallback;
