import Post from './Post'
import PostList1 from './PostList1'
import PostList2 from './PostList2'
import CreatePost from './CreatePost'
import PostListPaginated from './PostListPaginated'
import PostListInfinite from './PostListInfinite'
import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />)

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
        onClick={() => setCurrentPage(<Post id={1} />)}>
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
