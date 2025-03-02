import ClientComponent from "@/components/client-component";
import { Searchbar } from "@/components/searchbar";

//서버 컴포넌트이기 때문에 async가 사용 가능
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;
  return (
    <div>
      설치 페이지 {q}
      {/* <ClientComponent> */}
      <Searchbar />
      {/* </ClientComponent> */}
    </div>
  );
};

export default Page;
