"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, startTransition } from "react";

//reset은 함수
//클라이언트 내부의 에러만 복구 가능
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <h3>검색과정에서 오류가 발생했습니다.</h3>
      {/* 페이지를 강제로 재시도하게 만듬 window.location.reload를 사용하면 각종 데이터를 없어지게 됨. */}
      <button
        onClick={() => {
          startTransition(() => {
            //서버에 다시 요청.
            // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            // next 서버에 다시 요청
            router.refresh();
            //에러 상태를 초기화, 컴포넌트들을 다시 렌더링
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
