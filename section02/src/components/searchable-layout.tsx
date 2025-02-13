import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSumbit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };


  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSumbit();
    }
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력해주세요..."
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSumbit}>검색</button>
      </div>
      {children}
    </div>
  );
};

export default SearchableLayout;
