import { HttpResponse, http, delay } from "msw";
let posts = [
  { id: "1", title: "Повербанк 1", views: 100, isActive: false },
  { id: "2", title: "Повербанк 2", views: 200, isActive: false },
  { id: "3", title: "Повербанк 3", views: 100, isActive: false },
  { id: "4", title: "Повербанк 4", views: 200, isActive: false },
  { id: "5", title: "Повербанк 5", views: 100, isActive: false },
  { id: "6", title: "Повербанк 6", views: 200, isActive: true },
  { id: "7", title: "Повербанк 4", views: 200, isActive: false },
  { id: "8", title: "Повербанк 5", views: 100, isActive: false },
  { id: "9", title: "Повербанк 6", views: 200, isActive: false },
];

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
