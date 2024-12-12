import classNames from 'classnames';

import { statusColorMap } from '@/app/constants';
import { ProjectStatus as ProjStatus, statusMap } from '@/app/store';

import styles from './ProjectStatus.module.scss';

interface Props {
  status: ProjStatus;
}

const ProjectStatus = ({ status }: Props) => {
  return (
    <span className={classNames(styles.projectStatus, styles[statusColorMap[status]])}>
      {statusMap[status]}
    </span>
  );
};

export default ProjectStatus;
