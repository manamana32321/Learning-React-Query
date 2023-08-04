import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"
import Post from './types/Post'

export default function PostList1() {
  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <>
      <h1>Posts List 2</h1>

      <ol>
        {postsQuery.data?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </>)
}