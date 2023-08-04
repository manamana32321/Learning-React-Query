import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"

export default function PostListInfinite() {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    // isFetchingPreviousPage,
    // hasPreviousPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    // getPreviousPageParam: ,
    // getNextPageParam: prevData => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam)
  });

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  const posts = data.pages.flat();

  return (
    <>
      <h1>Post List Infinite</h1>

      {posts.map((post, index) => (
        <div key={post?.id || index}>
          {post?.id} {post?.title}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  )
}
