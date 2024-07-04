import path from "node:path";
import fs from "node:fs/promises";
import { pool } from "./bd.js";
import { PORT } from "./config.js";

export const index = async (request, response) => {
  try {
    const data = await fs.readFile("index.html");

    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    response.write(data);
    response.end();
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Error interno del servidor");
  }
};
export const usuariosExport = async (request, response) => {
  try {
    const [usuarios] = await pool.execute("SELECT * FROM usuarios");
    // console.log(usuarios);
    const rutaArchivo = path.resolve("./public/usuarios.csv");
    const csvHeaders =
      "id,nombre,apellidos,email,password,direccion,dni,edad,fecha_creacion,telefono\n";
    const csvData = usuarios
      .map(
        (usuario) =>
          `${usuario.usuario_id},${usuario.nombre},${usuario.apellidos},${usuario.email},${usuario.password},${usuario.direccion},${usuario.dni},${usuario.edad},${usuario.fecha_creacion},${usuario.telefono}`
      )
      .join("\n");
    const csvContent = csvHeaders + csvData;

    await fs.writeFile(rutaArchivo, csvContent, "utf-8");
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(
      JSON.stringify({ message: "Usuarios exportados correctamente" })
    );
  } catch (error) {
    console.log(error);
    response.writeHead(500, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify({ menssage: "Error interno" }));
  }
};

export const list = async (request, response) => {
  try {
    const usuarios = await pool.execute("SELECT * FROM usuarios");
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify(usuarios[0]));
  } catch (error) {
    console.log(error);
    response.writeHead(500, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify({ menssage: "Error interno" }));
  }
};
// export const insert = async (request, response) => {
//   try {
//     const data = await fs.readFile(rutaArchivo, "utf-8");
//   } catch (error) {}
// };
