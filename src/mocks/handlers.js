import { HttpResponse, http, delay } from "msw";
let posts = [
  {
    id: "1",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "2",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "3",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "4",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "5",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "6",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "7",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "8",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
  {
    id: "9",
    price: 0,
    isActive: false,
    endDate: "",
    rentalStart: "",
  },
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
const updatePostHandler = http.put(
  "/api/posts/:id",
  async ({ request, params }) => {
    await delay(1200);
    const updatedData = await request.json();
    const postIndex = posts.findIndex((post) => post.id === params.id);

    if (postIndex === -1) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedData,
    };

    return HttpResponse.json(posts[postIndex], { status: 200 });
  }
);

const deletePostHandler = http.delete("/api/posts/:id", async ({ params }) => {
  await delay(1200);
  const postId = params.id;

  posts = posts.filter((post) => post.id !== postId);
  return new HttpResponse(null, { status: 204 });
});

export const handlers = [
  postsHandler,
  createPostHandler,
  deletePostHandler,
  updatePostHandler,
];
