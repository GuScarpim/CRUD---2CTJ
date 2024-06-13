const express = require('express');
const router = express.Router();
const productController = require('../controllers/users');

// Definindo as rotas
router.get('/users', productController.getUsers);
router.get('/users/:id', productController.getUserById);
router.post('/users', productController.createUser);
router.put('/users/:id', productController.updateUser);
router.delete('/users/:id', productController.deleteUser);

module.exports = router;
