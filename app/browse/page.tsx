'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';
import searchSVG from '@/public/icons/search.svg';

import styles from './page.module.scss';
import { useProjectStore } from '../store';

interface SearchFormInput {
  query: string;
}

const BrowseProjectsPage = () => {
  const { loadProjects } = useBlockchain();
  const setSearchText = useProjectStore((s) => s.setSearchText);
  const { register, handleSubmit } = useForm<SearchFormInput>({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit: SubmitHandler<SearchFormInput> = ({ query }) => {
    setSearchText(query.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.browseProjectsPage}>
      <Header />
      <div className={styles.mainContent}>
        <CategorySidebar />
        <div className={styles.projectsSection}>
          <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
            <Image src={searchSVG} alt="Search Icon" width={24} height={24} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search for projects..."
              {...register('query', { required: true })}
            />
          </form>
          <ProjectsGrid />
        </div>
      </div>
    </div>
  );
};

export default BrowseProjectsPage;
