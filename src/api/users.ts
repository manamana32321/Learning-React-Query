export function getUser(id:number) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.json());
}