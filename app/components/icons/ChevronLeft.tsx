import { colors } from '@/app/constants';

interface Props {
  fill?: string;
  size?: number;
}

const { darkGray } = colors;

const ChevronLeft = ({ fill = darkGray, size = 20 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 241 432"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.05 198.913C-2.35 208.313 -2.35 223.513 7.05 232.813L199.05 424.913C208.45 434.313 223.65 434.313 232.95 424.913C242.25 415.513 242.35 400.313 232.95 391.013L57.95 215.913L233.05 40.9126C242.45 31.5126 242.45 16.3126 233.05 7.01255C223.65 -2.28745 208.45 -2.38745 199.15 7.01255L7.05 198.913Z" />
    </svg>
  );
};

export default ChevronLeft;
