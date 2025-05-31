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

export default async function handler(req, res) {
  await new Promise((r) => setTimeout(r, 200));

  if (req.method === "GET") {
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const newPost = req.body;
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  // Для PUT и DELETE можно сделать отдельные файлы с динамическими маршрутами,
  // например api/posts/[id].js
}
