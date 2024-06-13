const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/users');

// Middleware para parsing de JSON
app.use(express.json());

// Usar as rotas
app.use('/', productRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
