import { fetcher } from '@/utils/request';
import { List } from '@/types';

interface Params {
  page?: string;
  limit?: string;
  title?: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export function getPosts(params: Params = {
  page: '1',
  limit: '20',
}) {
  return fetcher<List<Post>>({
    url: '/posts',
    method: 'GET',
    params: {
      _page: params.page,
      _limit: params.limit,
      title_like: params.title,
    },
  });
}

export function getPostById(id: string) {
  return fetcher<Post>({
    url: `/posts/${id}`,
    method: 'GET',
  });
}
