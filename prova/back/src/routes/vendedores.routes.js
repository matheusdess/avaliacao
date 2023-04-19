const express = require("express");
const router = express.Router();

const Vendedores = require('../controllers/vendedores.controller.js');

router.post('/vendedor/criar', Vendedores.cadastrar);
router.get('/vendedores/listar', Vendedores.listar);
router.put('/vendedor/alterar/:id', Vendedores.alterar);
router.delete('/vendedor/excluir/:id', Vendedores.excluir);
router.get('/vendedores/vendas', Vendedores.vendas)

module.exports = router