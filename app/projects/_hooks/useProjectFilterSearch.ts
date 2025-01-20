import { ChangeEvent, useEffect, useState } from 'react';

import { useProjectsPageContext } from '@/app/hooks/useProjectsPageContext';
import { useDebounce } from './useDebounce';

export const useProjectFilterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { updateSearchQuery } = useProjectsPageContext();

  const { debouncedValue: debouncedSearchTerm } = useDebounce(searchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleReset = () => {
    setSearchTerm('');
    updateSearchQuery('');
  };

  useEffect(() => {
    updateSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateSearchQuery]);

  return { searchTerm, handleChange, handleReset };
};
