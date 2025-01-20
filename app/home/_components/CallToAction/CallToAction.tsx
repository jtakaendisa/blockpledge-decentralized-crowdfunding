import { colors } from '@/app/constants';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import SlideUpText from '../../../components/SlideUpText/SlideUpText';
import FlipButton from '../../../components/FlipButton/FlipButton';

import styles from './CallToAction.module.scss';

interface Props {
  onToggle: () => void;
}

const { white, lightGray, darkGreen } = colors;

const CallToAction = ({ onToggle }: Props) => {
  const { navigateToPageWithTransition } = usePageNavigation();

  const handleClick = () => {
    navigateToPageWithTransition('/projects');
  };

  return (
    <div className={styles.callToAction}>
      <div className={styles.headingContainer}>
        <h1 className={styles.headingSmall}>
          <SlideUpText playAnimation duration={0.8} delay={1} hidden>
            Bring Creative Projects To Life On
          </SlideUpText>
        </h1>
        <h1 className={styles.headingLarge}>
          <SlideUpText playAnimation duration={0.8} delay={1.5} hidden>
            BLOCKPLEDGE.
          </SlideUpText>
        </h1>
      </div>

      <div className={styles.buttons}>
        <FlipButton
          onClick={onToggle}
          textColor1={white}
          backgroundColor1={darkGreen}
          textColor2={darkGreen}
          backgroundColor2={lightGray}
        >
          Create Project
        </FlipButton>
        <FlipButton onClick={handleClick}>View All Projects</FlipButton>
      </div>
    </div>
  );
};

export default CallToAction;
