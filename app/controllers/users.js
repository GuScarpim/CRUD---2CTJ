// Importa o objeto `db` configurado a partir do módulo `../config/database`
const db = require('../config/database');

// Função para obter todos os usuários
const getUsers = (req, res) => {
  // Executa a consulta SQL para selecionar todos os registros da tabela `users`
  db.all("SELECT * FROM users", (err, rows) => {
    // Se houver um erro na consulta
    if (err) {
      // Envia uma resposta JSON com status 500 e a mensagem de erro
      res.status(500).json({ error: err.message });
      return;
    }
    // Se a consulta for bem-sucedida, envia uma resposta JSON com a mensagem "success" e os dados dos usuários
    res.json({
      message: "success",
      data: rows
    });
  });
};

// Função para obter um usuário por ID
const getUserById = (req, res) => {
  // Extrai o `id` dos parâmetros da URL
  const { id } = req.params;
  // Executa a consulta SQL para selecionar o usuário com o `id` especificado
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    // Se houver um erro na consulta
    if (err) {
      // Envia uma resposta JSON com status 500 e a mensagem de erro
      res.status(500).json({ error: err.message });
      return;
    }
    // Se nenhum usuário for encontrado
    if (!row) {
      // Envia uma resposta JSON com status 404 e uma mensagem indicando que o usuário não foi encontrado
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Se a consulta for bem-sucedida e o usuário for encontrado, envia uma resposta JSON com a mensagem "success" e os dados do usuário
    res.json({
      message: "success",
      data: row
    });
  });
};

// Função para criar um novo usuário
const createUser = (req, res) => {
  // Extrai os dados do usuário do corpo da requisição, com um valor padrão para `id` (o último ID inserido)
  const { id = this.lastID, name, lastName, age, email } = req.body;
  // Define a consulta SQL para inserir um novo usuário
  const sql = "INSERT INTO users (id, name, lastName, age, email) VALUES (?, ?, ?, ?, ?)";
  // Executa a consulta SQL para inserir o novo usuário
  db.run(sql, [id, name, lastName, age, email], function (err) {
    // Se houver um erro na inserção
    if (err) {
      // Envia uma resposta JSON com status 500 e a mensagem de erro
      res.status(500).json({ error: err.message });
      return;
    }
    // Se a inserção for bem-sucedida, envia uma resposta JSON com a mensagem "success" e os dados do novo usuário, incluindo o `id`
    res.json({
      message: "success",
      data: { id, name, lastName, age, email },
      id
    });
  });
};

// Função para atualizar um usuário existente
const updateUser = (req, res) => {
  // Extrai o `id` dos parâmetros da URL
  const { id } = req.params;
  // Extrai os dados do usuário do corpo da requisição
  const { name, lastName, age, email } = req.body;
  // Define a consulta SQL para atualizar um usuário existente
  const sql = "UPDATE users SET name = ?, lastName = ?, age = ?, email = ? WHERE id = ?";
  // Executa a consulta SQL para atualizar o usuário com o `id` especificado
  db.run(sql, [name, lastName, age, email, id], function (err) {
    // Se houver um erro na atualização
    if (err) {
      // Envia uma resposta JSON com status 500 e a mensagem de erro
      res.status(500).json({ error: err.message });
      return;
    }
    // Se a atualização for bem-sucedida, envia uma resposta JSON com a mensagem "success", os dados atualizados do usuário e o número de linhas afetadas (`changes`)
    res.json({
      message: "success",
      data: { id, name, lastName, age, email },
      changes: this.changes
    });
  });
};

// Função para deletar um usuário
const deleteUser = (req, res) => {
  // Extrai o `id` dos parâmetros da URL
  const { id } = req.params;
  // Define a consulta SQL para deletar um usuário
  const sql = "DELETE FROM users WHERE id = ?";
  // Executa a consulta SQL para deletar o usuário com o `id` especificado
  db.run(sql, id, function (err) {
    // Se houver um erro na exclusão
    if (err) {
      // Envia uma resposta JSON com status 500 e a mensagem de erro
      res.status(500).json({ error: err.message });
      return;
    }
    // Se a exclusão for bem-sucedida, envia uma resposta JSON com a mensagem "success" e o número de linhas afetadas (`changes`)
    res.json({
      message: "success",
      changes: this.changes
    });
  });
};

// Exporta as funções definidas (`getUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`) para que possam ser usadas em outros módulos
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
