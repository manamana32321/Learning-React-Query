import { USER_URL } from ".";

export function getUser(id:number) {
  return fetch(USER_URL + "/" + id)
    .then((response) => response.json());
}