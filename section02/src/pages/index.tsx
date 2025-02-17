//css module
//기존의 css파일을 module처럼 사용할 수 있게 해준다.
//import './index.css';
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';
import books from '@/mock/books.json'
import BookItem from '@/components/book-item';
export default function Home() {
  return (
    <>
      <section className={style.container}>
        <h3>지금 추천하는 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
