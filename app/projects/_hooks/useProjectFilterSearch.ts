import { ChangeEvent, useEffect, useState } from 'react';

import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import { useDebounce } from './useDebounce';

export const useProjectFilterSearch = () => {
  const { searchQuery } = useProjectsPageState(['searchQuery']);

  const [searchTerm, setSearchTerm] = useState('');

  const { debouncedValue: debouncedSearchTerm } = useDebounce(searchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleReset = () => {
    setSearchTerm('');
    searchQuery.set('');
  };

  useEffect(() => {
    searchQuery.set(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return { searchTerm, handleChange, handleReset };
};
