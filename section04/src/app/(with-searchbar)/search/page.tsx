import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음 (생략 가능)
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 static 페이지로 설정
// 4. error : 페이지를 강제로 static 페이지로 설정(설정하면 안되는 이유 -> 빌드 오류)
//동적인 페이지의 경우 static으로 사용할 경우 정상적으로 작동하지 않는다.
//export const dynamic = "";
//권장하지 않는다.

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  //static 한 page로 만들 수 없다.
  // query string은 동적인 값으로 최적화 x
  // cache를 통해 그나마 최적화 가능
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${
      (
        await searchParams
      ).q
    }`,
    { cache: "force-cache" }
  );

  if (!response.ok) <div> 오류가 발생했습니다.</div>;

  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
