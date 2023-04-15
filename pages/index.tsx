import { useState } from 'react';
import { useMount } from 'ahooks';
import { getPosts, Post } from '@/api/posts';
import Link from 'next/link';

function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  const onMount = async () => {
    const { list } = await getPosts();
    setPosts(list);
  };

  useMount(() => {
    onMount();
  });

  return (
    <>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} prefetch={false}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Page;
