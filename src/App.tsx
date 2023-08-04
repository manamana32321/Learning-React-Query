import Post from './Post'
import PostList1 from './PostList1'
import PostList2 from './PostList2'
import CreatePost from './CreatePost'
import PostListPaginated from './PostListPaginated'
import PostListInfinite from './PostListInfinite'
import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { getPost } from './api/posts'

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />)
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["post", 1],
      queryFn: () => getPost(1),
    })
  }

  return (
    <>
      <button
        disabled={currentPage.type === PostList1}
        onClick={() => setCurrentPage(<PostList1 />)}>
        Post List 1
      </button>
      <button
        disabled={currentPage.type === PostList2}
        onClick={() => setCurrentPage(<PostList2 />)}>
        Post List 2
      </button>
      <button
        onClick={() => setCurrentPage(<Post id={1} />)}
        onMouseEnter={onHoverPostOneLink}>
          First Post
      </button>
      <button
        onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
        New Post
      </button>
      <button
        onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List paginated
      </button>
      <button
        onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List paginated
      </button>
      <br />
      {currentPage}
    </>
  )
}
export default App;
