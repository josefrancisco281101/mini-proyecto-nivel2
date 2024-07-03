import path from "node:path";
import fs from "node:fs/promises";
import { pool } from "./bd.js";

export const index = async (request, response) => {
  try {
    const data = await fs.readFile("index.html");

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(data);
    response.end();
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Error interno del servidor");
  }
};
export const lista_usuarios = async (request, response) => {
  try {
    const usuarios = await pool.execute("SELECT * FROM usuarios");
  } catch (error) {}
};
