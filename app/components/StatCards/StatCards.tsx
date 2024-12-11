import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import StatCard from '../StatCard/StatCard';

import styles from './StatCards.module.scss';

const StatCards = () => {
  const stats = useProjectStore((s) => s.stats);

  const { totalBackings, totalDonations, totalProjects } = stats;

  const statsArray = [
    {
      metric: 'Active Projects',
      value: totalProjects,
    },
    {
      metric: 'Donations',
      value: totalBackings,
    },
    {
      metric: 'Total Funded',
      value: totalDonations,
    },
  ];

  return (
    <motion.div className={styles.stats} initial="initial" animate="enter">
      {statsArray.map((stat, index) => (
        <StatCard key={stat.metric} stat={stat} index={index} delay={3.5} />
      ))}
    </motion.div>
  );
};

export default StatCards;
