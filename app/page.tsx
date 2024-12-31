'use client';

import { ToastContainer } from 'react-toastify';

import Hero from './components/Hero/Hero';
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';
import { FeaturedProjectsProvider } from './contexts/FeaturedProjectsContext';

const HomePage = () => {
  return (
    <>
      <Hero />

      <FeaturedProjectsProvider>
        <FeaturedProjects />
      </FeaturedProjectsProvider>

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
