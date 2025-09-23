const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",   // ajuste se tiver outro usuário
  password: "raulgui123!",   // coloque sua senha
  database: "desafio_muralis"
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

module.exports = connection;
