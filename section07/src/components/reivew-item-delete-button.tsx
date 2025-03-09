"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import React, { useRef, useActionState, useEffect } from "react";

const ReivewItemDeleteButton = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isePending] = useActionState(
    deleteReviewAction,
    null
  );
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isePending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
};

export default ReivewItemDeleteButton;
