"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 서버액션을 이용하는 이유
  // api 호출 해도 되는데 왜 사용하는 가?
  // 코드가 매우 간결하다
  // 오직 서버측에서만 실행되서 브라우저에서 호출만 하기 때문에 보안적으로 뛰어나다.
  // 간결하고 편리하게 서버측에서 어떤 동작을 정의하는 데 있다.
  if (!content || !author || !bookId) return;
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
    revalidatePath(`/book/${bookId}`);
  } catch (error) {
    console.log(error);
    return;
  }
}
