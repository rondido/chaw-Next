import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

//getStaticPath 다이나믹한 경로를 설정

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, //false not-found 페이지로 실행 1,2,3이 아니면 없는 페이지로 생각함.
    //blocking 존재하지 않는 페이지를 이용하면 ssr로 이루어짐.
    //사전 렌더링 시간이 길어지게 되면 어쩔 수 없이 loading이 발생

    //fallback: true
    //true 존재하지 않는 페이지를 요청 Props가 없는 페이지 반환
    // 데이터가 없는 페이지
    // 간단하게 생각하면 layout 정도만 사전 렌더링
    //props 계싼
    // props만 따로 반환 (데이터만 따로 반환)
  };
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const book = await fetchOneBook(Number(id));
//   return {
//     props: {
//       book,
//     },
//   };
// };

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  // 404 페이지로 리다이렉트 시킴
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  //서버에서 데이터를 받아오는 상태
  if (router.isFallback) {
    return (
      <>
        {/* fallback 상태일때도 seo 적용 가능*/}
        <Head>
          <title>한입북스</title>
          {/* sns 공유 관련 메타 */}
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중 입니다.</div>
      </>
    );
  }

  if (!book) return "문제가 발생했어요 다시 시도하세요.";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        {/* 현재는 meta의 상태가 모든 데이터를 불러온 상태에서 적용되도록 설정*/}
        <title>{title}</title>
        {/* sns 공유 관련 메타 */}
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
