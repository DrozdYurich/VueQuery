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
  const { id } = req.query;
  await new Promise((r) => setTimeout(r, 1200)); // задержка

  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (req.method === "PUT") {
    posts[postIndex] = { ...posts[postIndex], ...req.body };
    return res.status(200).json(posts[postIndex]);
  }

  if (req.method === "DELETE") {
    posts.splice(postIndex, 1);
    return res.status(204).end();
  }

  res.status(405).end(); // Method not allowed
}
