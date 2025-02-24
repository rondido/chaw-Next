import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>페이지 {id}</div>;
};

export default Page;
