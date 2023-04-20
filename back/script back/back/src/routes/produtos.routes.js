const express = require("express");
const router = express.Router();

const Produtos = require('../controllers/produtos.controller.js');

router.post('/produto/criar', Produtos.cadastrar);
router.get('/produtos/listar', Produtos.listar);
router.put('/produto/alterar/:id', Produtos.alterar);
router.delete('/produto/excluir/:id', Produtos.excluir);

module.exports = router