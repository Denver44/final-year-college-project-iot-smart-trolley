import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemcu_db",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

export default db;
