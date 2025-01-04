import { colors } from '@/app/constants';

interface Props {
  fill?: string;
  size?: number;
}

const { darkGray } = colors;

const Envelope = ({ fill = darkGray, size = 20 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 384"
      width={size}
      height={size}
      fill={fill}
    >
      <path d="M64 32C46.3 32 32 46.3 32 64V103.9L227.6 247.3C244.5 259.7 267.5 259.7 284.4 247.3L480 103.9V64C480 46.3 465.7 32 448 32H64ZM32 143.6V320C32 337.7 46.3 352 64 352H448C465.7 352 480 337.7 480 320V143.6L303.3 273.1C275.1 293.7 236.8 293.7 208.7 273.1L32 143.6ZM0 64C0 28.7 28.7 0 64 0H448C483.3 0 512 28.7 512 64V320C512 355.3 483.3 384 448 384H64C28.7 384 0 355.3 0 320V64Z" />
    </svg>
  );
};

export default Envelope;
