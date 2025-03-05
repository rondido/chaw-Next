import style from "./page.module.css";

import { notFound } from "next/navigation";

//4번 페이지로 이동시에는 바로 404 page로 이동
//export const dynamicParams = false;

//정적인 파라미터를 생성하는 함수
// 주의 사항
// url 파라미터는 문자열로 정의해야 함.
// 페이지의 컴포넌트 해당하는 static page로써 캐시가 강제로 설정
//getstaticPaths의 app router 버전
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    <div>오류가 발생했습니다.</div>;
  }
  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <section>
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
    </section>
  );
}

function ReviewEditor() {
  async function createReviewAction(formData: FormData) {
    "use server";
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    // 서버액션을 이용하는 이유
    // api 호출 해도 되는데 왜 사용하는 가?
    // 코드가 매우 간결하다
    // 오직 서버측에서만 실행되서 브라우저에서 호출만 하기 때문에 보안적으로 뛰어나다.
    // 간결하고 편리하게 서버측에서 어떤 동작을 정의하는 데 있다.
  }
  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={style.container}>
      <BookDetail bookId={(await params).id} />
      <ReviewEditor />
    </div>
  );
}
