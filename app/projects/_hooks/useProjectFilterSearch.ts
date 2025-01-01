import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

type SearchQuery = {
  get: string;
  set: (value: string) => void;
};

export const useProjectFilterSearch = (searchQuery: SearchQuery) => {
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
