import { POST_URL } from ".";

export function getPosts() {
  return fetch(POST_URL)
    .then((response) => response.json());
}

export function getPostsPaginated(page: number = 1, limit: number = 10) {
  const url = `${POST_URL}?_page=${page}&_limit=${limit}`;
  return fetch(url)
    .then((response) => response.json());
}

export function getPost(id:number) {
  return fetch(POST_URL + "/" + id)
    .then((response) => response.json());
}

export function createPost({ title, body }: { title: string, body: string }) {
  return fetch(POST_URL, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
}
