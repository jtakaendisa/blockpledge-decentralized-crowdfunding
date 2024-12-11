'use client';

import { ToastContainer } from 'react-toastify';

import Hero from './components/Hero/Hero';
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedProjects />
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
