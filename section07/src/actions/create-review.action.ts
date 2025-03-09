"use server";

import { revalidatePath, revalidateTag } from "next/cache";

//_는 클라이언트 액션에서 사용되는 useActionState hook을  사용하기 위해서 무조건 사용해줘야 함.
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 서버액션을 이용하는 이유
  // api 호출 해도 되는데 왜 사용하는 가?
  // 코드가 매우 간결하다
  // 오직 서버측에서만 실행되서 브라우저에서 호출만 하기 때문에 보안적으로 뛰어나다.
  // 간결하고 편리하게 서버측에서 어떤 동작을 정의하는 데 있다.
  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );
    console.log(response.status);
    //리뷰 작성 후 새로고침 되는 것처럼 되어 새로운 데이터가 바로 화면에 보이게 됨.
    //next server 서브 측에 재검증 요청
    //1 . 특정 주소의 해당하는 페이지만 검증
    // revalidatePath(`/book/${bookId}`);
    // //2. 특정 경로의 모든 동적 페이지를 재검증.
    // revalidatePath("/book/[id]", "page");

    // //3. 특정 레이아웃을 갖는 모든 페이지 재검증(width-searchbar)
    // revalidatePath("/(width-searchbar)", "layout");

    // // 4. 모든 데이터를 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준. 데이터 캐시 재검증
    // api 호출하는 곳에서 {next: {tags:[`reivew-${bookId}`]}}를 통해 tag를 설정할 수 있음.
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`reivew-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다.`,
    };
  }
}
