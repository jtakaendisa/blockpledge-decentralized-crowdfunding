import { colors } from '@/app/constants';
import CheckCircle from './CheckCircle';
import CrossCircle from './CrossCircle';

interface Props {
  refunded: boolean;
}

const { darkGreen, red } = colors;

const RefundedIcon = ({ refunded }: Props) => {
  if (refunded) {
    return <CheckCircle fill={darkGreen} />;
  } else {
    return <CrossCircle fill={red} />;
  }
};

export default RefundedIcon;
