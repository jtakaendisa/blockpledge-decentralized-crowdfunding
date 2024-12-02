'use client';

import { ToastContainer } from 'react-toastify';

import { useProjectStore } from './store';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

const HomePage = () => {
  const projects = useProjectStore((s) => s.projects);
  const categories = useProjectStore((s) => s.categories);

  return (
    <>
      <Hero />
      <ProjectsRow projects={projects} />
      {/* <CategoriesGrid categories={categories} /> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
      />
    </>
  );
};

export default HomePage;
