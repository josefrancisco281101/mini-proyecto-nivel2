import mysql2 from "mysql2/promise";
export const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nivel2",
  port: 3306,
});
