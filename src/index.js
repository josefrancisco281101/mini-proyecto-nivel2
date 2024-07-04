import http from "node:http";
import { index, usuariosExport, list } from "./controller.js";
import { PORT } from "./config.js";
const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;
  if (method === "GET") {
    switch (url) {
      case "/":
        index(request, response);

        break;
      case "/api/usuarios":
        list(request, response);
        break;
      case "/api/usuarios/export":
        usuariosExport(request, response);
        break;
      case "/api/usuarios/import":
        insert(request, response);
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

server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
