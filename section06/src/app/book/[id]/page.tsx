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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`
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
  );
}
