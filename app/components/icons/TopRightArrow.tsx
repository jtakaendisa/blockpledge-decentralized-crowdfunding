import { colors } from '@/app/constants';

interface Props {
  fill?: string;
  size?: number;
}

const { darkGray } = colors;

const TopRightArrow = ({ fill = darkGray, size = 20 }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 321"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M295.913 0C309.213 0 319.913 10.7 319.913 24V264C319.913 277.3 309.213 288 295.913 288C282.613 288 271.913 277.3 271.913 264V81.9L40.9126 313C31.5126 322.4 16.3126 322.4 7.01255 313C-2.28745 303.6 -2.38745 288.4 7.01255 279.1L238.013 48.1L55.9126 48C42.6126 48 31.9126 37.3 31.9126 24C31.9126 10.7 42.6126 0 55.9126 0H295.913Z"
        fill={fill}
      />
    </svg>
  );
};

export default TopRightArrow;
