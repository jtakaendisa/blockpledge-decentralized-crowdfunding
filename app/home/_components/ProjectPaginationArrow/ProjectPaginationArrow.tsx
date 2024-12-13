import classNames from 'classnames';

import { colors } from '@/app/constants';

import styles from './ProjectPaginationArrow.module.scss';

interface Props {
  icon: 'chevronLeft' | 'chevronRight';
  disabled: boolean;
  size?: number;
  onChange: (mode: 'increment' | 'decrement') => void;
}

const { darkGreen, gray } = colors;

const ProjectPaginationArrow = ({ icon, disabled, size = 12, onChange }: Props) => {
  const fill = !disabled ? darkGreen : gray;

  return (
    <span
      onClick={() => onChange(icon === 'chevronLeft' ? 'decrement' : 'increment')}
      className={classNames({ [styles.arrow]: true, [styles.disabled]: disabled })}
    >
      {icon === 'chevronLeft' ? (
        <svg
          width={size}
          height={size}
          viewBox="0 0 241 432"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.05 198.913C-2.35 208.313 -2.35 223.513 7.05 232.813L199.05 424.913C208.45 434.313 223.65 434.313 232.95 424.913C242.25 415.513 242.35 400.313 232.95 391.013L57.95 215.913L233.05 40.9126C242.45 31.5126 242.45 16.3126 233.05 7.01255C223.65 -2.28745 208.45 -2.38745 199.15 7.01255L7.05 198.913Z"
            fill={fill}
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 241 432"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M233.05 198.913C242.45 208.313 242.45 223.513 233.05 232.813L41.05 424.913C31.65 434.313 16.45 434.313 7.15 424.913C-2.15 415.513 -2.25 400.313 7.15 391.013L182.15 216.013L7.05 40.9126C-2.35 31.5126 -2.35 16.3126 7.05 7.01255C16.45 -2.28745 31.65 -2.38745 40.95 7.01255L233.05 198.913Z"
            fill={fill}
          />
        </svg>
      )}
    </span>
  );
};

export default ProjectPaginationArrow;
