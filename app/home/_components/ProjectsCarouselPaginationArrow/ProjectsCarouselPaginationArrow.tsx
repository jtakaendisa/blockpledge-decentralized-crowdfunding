import classNames from 'classnames';

import { colors } from '@/app/constants';
import ChevronLeft from '@/app/components/icons/ChevronLeft';
import ChevronRight from '@/app/components/icons/ChevronRight';

import styles from './ProjectsCarouselPaginationArrow.module.scss';

interface Props {
  icon: 'chevronLeft' | 'chevronRight';
  disabled: boolean;
  size?: number;
  onChange: (mode: 'increment' | 'decrement') => void;
}

const { darkGreen, baseGray } = colors;

const ProjectsCarouselPaginationArrow = ({
  icon,
  disabled,
  size = 12,
  onChange,
}: Props) => {
  const fill = !disabled ? darkGreen : baseGray;

  return (
    <span
      onClick={() => onChange(icon === 'chevronLeft' ? 'decrement' : 'increment')}
      className={classNames({ [styles.arrow]: true, [styles.disabled]: disabled })}
    >
      {icon === 'chevronLeft' ? (
        <ChevronLeft fill={fill} size={size} />
      ) : (
        <ChevronRight fill={fill} size={size} />
      )}
    </span>
  );
};

export default ProjectsCarouselPaginationArrow;
