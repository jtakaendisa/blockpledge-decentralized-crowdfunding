'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useProjectStore } from '@/app/store';
import searchSVG from '@/public/icons/search.svg';
import xmarkSVG from '@/public/icons/xmark.svg';

import styles from './SearchInput.module.scss';

interface SearchFormInput {
  query: string;
}

const SearchInput = () => {
  const setSearchText = useProjectStore((s) => s.setSearchText);
  const { register, handleSubmit, watch, reset } = useForm<SearchFormInput>({
    defaultValues: {
      query: '',
    },
  });

  const watchShowClearInput = watch('query');

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
      {watchShowClearInput.length > 0 && (
        <Image
          onClick={() => reset()}
          src={xmarkSVG}
          alt="Clear Input"
          width={18}
          height={18}
        />
      )}
    </form>
  );
};

export default SearchInput;
