'use client';

import { useState } from 'react';

export const useCarouselPagination = (totalPages: number) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const handlePageSelect = (selectedPage: number) => setSelectedPage(selectedPage);

  const handlePageChange = (increment: number) => {
    setSelectedPage((prev) => {
      const newPage = prev + increment;
      if (newPage < 1) return 1;
      if (newPage > totalPages) return totalPages;
      return newPage;
    });
  };

  return { selectedPage, handlePageSelect, handlePageChange };
};
