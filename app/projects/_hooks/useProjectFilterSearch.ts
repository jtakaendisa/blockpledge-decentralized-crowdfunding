import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from './useDebounce';

interface FastContextSearchQuery {
  get: string;
  set: (value: string) => void;
}

export const useProjectFilterSearch = (searchQuery: FastContextSearchQuery) => {
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
