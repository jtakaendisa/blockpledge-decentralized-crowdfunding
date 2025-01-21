import { motion } from 'framer-motion';

import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';
import StatCard from '../StatCard/StatCard';

import styles from './StatCards.module.scss';

const StatCards = () => {
  const { stats } = useGlobalStateContext();

  const { totalBackings, totalDonations, totalProjects } = stats;

  const statsArray = [
    {
      metric: 'Active Projects',
      value: totalProjects,
    },
    {
      metric: totalBackings === 1 ? 'Contribution' : 'Contributions',
      value: totalBackings,
    },
    {
      metric: 'Total Received (ETH)',
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
