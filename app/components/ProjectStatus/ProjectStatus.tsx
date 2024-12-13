import classNames from 'classnames';

import { statusColorMap } from '@/app/constants';
import { ProjectStatus as ProjStatus, statusMap } from '@/app/store';

import styles from './ProjectStatus.module.scss';

interface Props {
  status: ProjStatus;
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
