import mysql2 from "mysql2/promise";
export const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nivel2",
  port: 3306,
});

// async function testConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log("Conexión exitosa a la base de datos.");
//     connection.release();
//   } catch (error) {
//     console.error("Error al conectar a la base de datos:", error);
//   }
// }

// testConnection();
