'use client';

import Image from 'next/image';
import Identicon from 'react-identicons';
import { FaEthereum } from 'react-icons/fa';

import ProgressBar from '@/app/components/ProgressBar/ProgressBar';
import Button from '@/app/components/Button/Button';
import robot from '@/public/images/robot.jpg';

import styles from './ProjectDetails.module.scss';

const ProjectDetails = () => {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.image}>
        <Image src={robot} alt="robot" />
      </div>
      <div className={styles.info}>
        <h5>Creating a Household Robot</h5>
        <small>{3} days left</small>
        <div className={styles.row}>
          <div className={styles.backings}>
            <Identicon string="0x9e...12af" size={15} />
            <small>0x9e...12af</small>
            <small>{16} Backings</small>
          </div>
          <small>Open</small>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim provident
          consectetur quia. Veritatis unde consequuntur vero nostrum laborum corporis.
          Sequi laborum eligendi nemo minima quae necessitatibus tenetur fugiat,
          doloribus tempore!
        </p>
        <ProgressBar progress={50} />
        <div className={styles.row}>
          <small>{3} ETH Raised</small>
          <div className={styles.etherTarget}>
            <FaEthereum />
            <small>{10} ETH</small>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button>Back Project</Button>
          <Button color="gray">Edit</Button>
          <Button color="red">Delete</Button>
          <Button color="orange">Payout</Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
