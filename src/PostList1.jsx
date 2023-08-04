import { useQuery, useQueries } from "@tanstack/react-query"
import { getPost, getPosts } from "./api/posts"
// import Post from './types/Post'

export default function PostList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Placeholder Post"}],
    initialData: [{ id: 1, title: "Initial Post"}],
    // staleTime: 1000 * 60 * 5,
    // refetchInterval: 1000,
  })

  // const queries = useQueries({
  //   queries: (postsQuery?.data ?? []).map(post =>  {
  //   return {
  //     queryKey: ["post", post.id],
  //     queryFn: () => getPost(post.id),
  //   }
  // })})

  // console.log(queries.map(query => query.data))

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <>
      <h1>Posts List 1</h1>

      <ol>
        {postsQuery.data?.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </>)
}