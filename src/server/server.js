import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  setTimeout(next, 2000);
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server with delay running on port 3000");
});
