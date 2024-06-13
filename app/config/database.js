// Importa a biblioteca sqlite3 e ativa o modo verbose, que ajuda na depuração
const sqlite3 = require('sqlite3').verbose();

// Cria uma nova instância do banco de dados SQLite, usando um arquivo chamado 'my-database.db' para persistência
const db = new sqlite3.Database('./my-database.db');
// const db = new sqlite3.Database(':memory:'); // Usando banco de dados em memória para simplicidade

// Usa o método `serialize` para garantir que as operações dentro dele sejam executadas de forma sequencial
db.serialize(() => {
  // Cria uma tabela chamada `users` se ela não existir
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lastName TEXT,
    age INT,
    email TEXT
  )`);
});

// Exporta a instância do banco de dados para que possa ser usada em outros módulos
module.exports = db;