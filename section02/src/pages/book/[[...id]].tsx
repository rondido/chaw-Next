import { useRouter } from 'next/router';
const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Book Id</div>;
};

export default Page;
