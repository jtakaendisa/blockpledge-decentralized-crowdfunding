import classNames from 'classnames';

import { Status } from '@/app/entities';
import { statusMap, statusColorMap } from '@/app/constants';

import styles from './ProjectStatus.module.scss';

interface Props {
  status: Status;
  fontSize?: number;
  fontWeight?: number;
}

const ProjectStatus = ({ status, fontSize, fontWeight }: Props) => {
  return (
    <span
      style={{ fontSize, fontWeight }}
      className={classNames(styles.projectStatus, styles[statusColorMap[status]])}
    >
      {statusMap[status]}
    </span>
  );
};

export default ProjectStatus;
