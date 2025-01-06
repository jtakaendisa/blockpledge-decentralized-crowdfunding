import { Project } from '@/app/entities';

import SectionHeading from '../SectionHeading/SectionHeading';
import DashboardProjectsCarousel from '../DashboardProjectsCarousel/DashboardProjectsCarousel';

import styles from './DashboardProjectsSection.module.scss';

interface Props {
  sectionTitle: string;
  projects: Project[];
}

const DashboardProjectsSection = ({ sectionTitle, projects }: Props) => {
  return (
    <section className={styles.dashboardProjectsSection}>
      <SectionHeading>{sectionTitle}</SectionHeading>
      <DashboardProjectsCarousel projects={projects} />
    </section>
  );
};

export default DashboardProjectsSection;
