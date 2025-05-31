// Исходные данные
let posts = [
  { id: "1", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "2", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "3", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "4", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "5", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "6", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "7", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "8", price: 0, isActive: false, endDate: "", rentalStart: "" },
  { id: "9", price: 0, isActive: false, endDate: "", rentalStart: "" },
];

// Имитируем задержку, как в вашем msw (необязательно)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Получить все посты
export async function getPosts() {
  await delay(200);
  return [...posts]; // возвращаем копию массива
}

// Создать новый пост
export async function createPost(newPost) {
  await delay(200);

  // Генерируем уникальный id (например, по текущему времени)
  const id = Date.now().toString();

  const postWithId = { id, ...newPost };
  posts.push(postWithId);

  return postWithId;
}

// Обновить пост по id
export async function updatePost(id, updatedData) {
  await delay(200);

  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    throw new Error("Post not found");
  }

  posts[postIndex] = {
    ...posts[postIndex],
    ...updatedData,
  };

  return posts[postIndex];
}

// Удалить пост по id
export async function deletePost(id) {
  await delay(200);

  const initialLength = posts.length;
  posts = posts.filter((post) => post.id !== id);

  if (posts.length === initialLength) {
    throw new Error("Post not found");
  }

  return true;
}
