import http from "node:http";
import { index } from "./controller.js";
const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  if (method === "GET") {
    switch (url) {
      case "/":
        index(request, response);

        break;
      case "/api/usuarios":
        break;
      case "/api/usuarios/export":
        break;
      case "/api/usuarios/import":
        break;

      default:
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("Ruta no encontrada");
        break;
    }
  }
  if (method === "POST") {
  }
});

server.listen(3000, () => console.log("Servidor en http://localhost:3000"));
