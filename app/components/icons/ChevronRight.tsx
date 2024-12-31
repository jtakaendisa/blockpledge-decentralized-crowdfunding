import { colors } from '@/app/constants';

interface Props {
  fill?: string;
  size?: number;
}

const { darkGray } = colors;

const ChevronRight = ({ fill = darkGray, size = 20 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 241 432"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M233.05 198.913C242.45 208.313 242.45 223.513 233.05 232.813L41.05 424.913C31.65 434.313 16.45 434.313 7.15 424.913C-2.15 415.513 -2.25 400.313 7.15 391.013L182.15 216.013L7.05 40.9126C-2.35 31.5126 -2.35 16.3126 7.05 7.01255C16.45 -2.28745 31.65 -2.38745 40.95 7.01255L233.05 198.913Z" />
    </svg>
  );
};

export default ChevronRight;
