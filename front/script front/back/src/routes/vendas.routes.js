const express = require("express");
const router = express.Router();

const Vendas = require('../controllers/vendas.controller.js');

router.post('/venda/criar', Vendas.cadastrar);
router.get('/vendas/listar', Vendas.listar);
router.put('/venda/alterar/:id', Vendas.alterar);
router.delete('/venda/excluir/:id', Vendas.excluir);
router.get('/vendas/vendas', Vendas.vendas);
router.get('/vendas/total', Vendas.total);

module.exports = router