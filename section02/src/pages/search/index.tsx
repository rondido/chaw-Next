"use client";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";

import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/type";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   //context 브라우저에서 요청한 모든 데이터가 들어있음.
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books,
//     },
//   };
// };

//ssg로 검색을 통해 서버로 받아올 수 없다.
//사전에 렌더링하기 때문에 미리 url에 있는 값을 빌드 타임에 알 수 없다.
// export const getStaticProps = async (
//     context: GetStaticPropsContext
//   ) => {
//     //context 브라우저에서 요청한 모든 데이터가 들어있음.
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);
//     return {
//       props: {
//         books,
//       },
//     };
//   };

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      <Head>
        <title>한입북스 - 검색 결과</title>
        {/* sns 공유 관련 메타 */}
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
