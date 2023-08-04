import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getPostsPaginated } from "./api/posts"

export default function PostListPaginated() {
  const [page, setPage] = useState(1)

  const { isLoading, isError, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", page],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page, 3),
  })

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && "Previous Data"}</small>
      </h1>

      {
        data.map((post: any) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>))
      }

      {
        <button onClick={() => setPage(page - 1)}>
          Previous
        </button>
      }{" "}
      {
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      }
    </>
  )
}