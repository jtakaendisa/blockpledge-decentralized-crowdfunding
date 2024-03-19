'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useProjectStore } from '@/app/store';
import searchSVG from '@/public/icons/search.svg';

import styles from './SearchInput.module.scss';

interface SearchFormInput {
  query: string;
}

const SearchInput = () => {
  const setSearchText = useProjectStore((s) => s.setSearchText);
  const { register, handleSubmit } = useForm<SearchFormInput>({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit: SubmitHandler<SearchFormInput> = ({ query }) => {
    setSearchText(query.toLowerCase());
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <Image src={searchSVG} alt="Search Icon" width={24} height={24} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search for projects..."
        {...register('query')}
      />
    </form>
  );
};

export default SearchInput;
