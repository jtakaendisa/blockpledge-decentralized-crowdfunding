'use client';

import { ToastContainer } from 'react-toastify';

import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <ProjectsRow /> */}
      <CategoriesGrid />
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
