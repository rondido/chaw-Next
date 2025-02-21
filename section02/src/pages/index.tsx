//css module
//기존의 css파일을 module처럼 사용할 수 있게 해준다.
//import './index.css';
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

//ssr로 동작
// export const getServerSideProps = async () => {
//   // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 미리 불러오는 함수
//   //주의사항
//   //사전 렌더링 과정 중에서 딱 한번만 실행
//   //오직 서버측에서만 실행
//   //객체를 반환해야 함.
//   //props 프로퍼티를 작성해놔야 함.
//   //브라우저에서 사용할 수 있는 브라우저 객체는 useEffect를 이용하여
//   // 사용 가능.

//   // const allBooks = await fetchBooks();
//   // const recoBooks = await fetchRandomBooks();
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);
//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// ssg 정적 사이트
//한번만 실행 되어야 하는데 여러번 실행되는 이유는 개발 모드이기 때문
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //InferGetServerSidePropsType<typeof getServerSideProps>
  return (
    <>
      <section className={style.container}>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
