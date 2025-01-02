'use client';

import { ToastContainer } from 'react-toastify';

import { FeaturedProjectsProvider } from './contexts/FeaturedProjectsContext';
import Hero from './home/_components/Hero/Hero';
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

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
