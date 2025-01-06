import { useState } from 'react';

export const useCarouselPagination = (totalPages: number) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const handlePageSelect = (selectedPage: number) => setSelectedPage(selectedPage);

  const handlePageChange = (mode: 'increment' | 'decrement') => {
    if (mode === 'decrement' && selectedPage === 1) return;
    if (mode === 'increment' && selectedPage === totalPages) return;

    setSelectedPage((prev) => (mode === 'decrement' ? prev - 1 : prev + 1));
  };

  return { selectedPage, handlePageSelect, handlePageChange };
};
