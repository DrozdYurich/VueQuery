import { HttpResponse, http, delay } from "msw";
let posts = [
  { id: "1", title: "a title", views: 100 },
  { id: "2", title: "another title", views: 200 },
  { id: "3", title: "a title", views: 100 },
  { id: "4", title: "another title", views: 200 },
  { id: "5", title: "a title", views: 100 },
  { id: "6", title: "another title", views: 200 },
  { id: "7", title: "a title", views: 100 },
  { id: "8", title: "another title", views: 200 },
  { id: "9", title: "another title", views: 200 },
  { id: "10", title: "a title", views: 100 },
  { id: "11", title: "another title", views: 200 },
  { id: "12", title: "a title", views: 100 },
  { id: "13", title: "another title", views: 200 },
  { id: "14", title: "a title", views: 100 },
  { id: "15", title: "another title", views: 200 },
  { id: "16", title: "a title", views: 100 },
  { id: "17", title: "another title", views: 200 },
  { id: "18", title: "a title", views: 100 },
  { id: "19", title: "another title", views: 200 },
  { id: "20", title: "another title", views: 200 },
  { id: "21", title: "a title", views: 100 },
  { id: "22", title: "another title", views: 200 },
  { id: "23", title: "a title", views: 100 },
  { id: "24", title: "another title", views: 200 },
  { id: "25", title: "a title", views: 100 },
  { id: "26", title: "another title", views: 200 },
  { id: "27", title: "a title", views: 100 },
  { id: "28", title: "another title", views: 200 },
  { id: "29", title: "a title", views: 100 },
  { id: "30", title: "another title", views: 200 },
  { id: "31", title: "another title", views: 200 },
  { id: "32", title: "a title", views: 100 },
  { id: "33", title: "another title", views: 200 },
  { id: "34", title: "a title", views: 100 },
  { id: "35", title: "another title", views: 200 },
  { id: "36", title: "a title", views: 100 },
  { id: "37", title: "another title", views: 200 },
  { id: "38", title: "a title", views: 100 },
  { id: "39", title: "another title", views: 200 },
  { id: "40", title: "a title", views: 100 },
  { id: "41", title: "another title", views: 200 },
  { id: "42", title: "another title", views: 200 },
  { id: "43", title: "a title", views: 100 },
  { id: "44", title: "another title", views: 200 },
];
// response resolver
const postsResolver = async () => {
  await delay(1200);
  return HttpResponse.json(posts);
};

// request resolver
const postsHandler = http.get("/api/posts", postsResolver);

const createPostHandler = http.post("/api/posts", async ({ request }) => {
  await delay(1200);
  const newPost = await request.json();

  const postWithId = {
    ...newPost,
    id: Date.now().toString(), // Генерация уникального ID
  };

  posts.push(postWithId);
  return HttpResponse.json(postWithId, { status: 201 });
});
const deletePostHandler = http.delete("/api/posts/:id", async ({ params }) => {
  await delay(1200);
  const postId = params.id;

  posts = posts.filter((post) => post.id !== postId);
  return new HttpResponse(null, { status: 204 });
});
export const handlers = [postsHandler, createPostHandler, deletePostHandler];
