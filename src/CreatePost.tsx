import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, FormEvent } from "react"
import { createPost } from "./api/posts"
import PostList1 from "./PostList1";

export default function CreatePost({ setCurrentPage } : { setCurrentPage: Function }) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data: any, variables, context) => {
      queryClient.setQueryData(["posts", data.id], data)
      queryClient.invalidateQueries(['posts'], { exact: true })
      // setCurrentPage(<Post id={data.id} />) // as this project does not have backend, so 'data.id' is undefined
      setCurrentPage(<PostList1 />)   // instead, go back to PostList1
      console.log(data, variables, context)    // can see what 'onMutate' returns
    },
    onError: (error, variables, context) => {
      console.log(error)
    },
    onSettled: (data, error, variables, context) => {
      console.log(data)
    },
    onMutate: (variables) => {
      console.log(`Things to do before mutation`)
      return { "hi": "This is hi message." }
    },
    // retry: 3,   // retry 3 times if error, but generally not recommended for mutation
  })

  // Properties for 'mutation'
  // createPostMutation.data
  // createPostMutation.error
  // createPostMutation.status (error, idle, loading, success)
  // createPostMutation.isError
  // createPostMutation.isIdle
  // createPostMutation.isLoading
  // createPostMutation.isSuccess
  // createPostMutation.reset
  // createPostMutation.variables

  // createPostMutation.mutate
  // createPostMutation.mutateAsync

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createPostMutation.mutate(
      { title, body },
      {
        onError: (error, variables, context) => {
          // not recommended to use this, use 'onError' in 'useMutation' instead
          console.log(`Custom error handler for this specific mutation`)
        }
      }
    )
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.currentTarget.value)} />
        </div>

        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  )
}