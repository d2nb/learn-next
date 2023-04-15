import type { GetServerSidePropsContext } from 'next';
import { getPostById, Post } from '@/api/posts';

interface PageProps {
  post: Post
}

const Page = (props: PageProps) => (
  <>
    <h1 className="text-2xl mb-2">
      {props.post.title}
    </h1>
    <p>
      {props.post.body}
    </p>
  </>
);

export async function getServerSideProps(context: GetServerSidePropsContext<{
  id: string;
}>) {
  const data = await getPostById(context.params?.id as string);

  return {
    props: {
      post: data,
    },
  };
}

export default Page;
