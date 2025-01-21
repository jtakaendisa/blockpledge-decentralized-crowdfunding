import { ToastContainer } from 'react-toastify';

import { FeaturedProjectsProvider } from './contexts/FeaturedProjectsContext';
import Hero from './home/_components/Hero/Hero';
import FeaturedProjects from './home/_components/FeaturedProjects/FeaturedProjects';
import CategoriesGrid from './home/_components/CategoriesGrid/CategoriesGrid';

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
