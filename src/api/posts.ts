export function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json());
}

export function getPost(id:number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json());
}
