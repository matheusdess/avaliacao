const con = require("../dao/connect");

const cadastrar = (req, res) => {
    let data = req.body

    let query = `INSERT INTO vendas VALUES (DEFAULT, '${data.data}', ${data.quantidade}, ${data.produtoId}, ${data.vendedorId})`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: err
            }).end();
        }else {
            data.id = result.insertId;
            
            res.status(200).json(data).end();
        }
    });
};

const listar = (req, res) => {
    let query = `SELECT * FROM vendas`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar vendas"
            }).end();
        }else {
            res.status(200).json(result).end();
        }
    });
}

const alterar = (req, res) => {
    let { data, quantidade, produtoId, vendedorId } = req.body;

    let { id } = req.params;

    let query = `UPDATE vendas SET data = '${data}', quantidade = ${quantidade}, produtoId = ${produtoId}, vendedorId = ${vendedorId} WHERE id = '${id}'`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao alterar atendimento"
            }).end();
        }else {
            res.status(200).json({
                message: "Produto alterado com sucesso"
            }).end();
        }
    });
}

const excluir = (req, res) => {
    let { id } = req.params
    const query = `DELETE FROM vendas WHERE id = '${id}'`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao alterar atendimento"
            }).end();
        }else {
            res.status(204).json({
                message: "Produto removido com sucesso"
            }).end();
        }
    });
}

const vendas = (req, res) => {
    let query = `SELECT ve.data, p.nome AS nome_produto, v.nome AS nome_vendedor
    FROM vendas ve
    JOIN produtos p ON p.id = ve.produtoId
    JOIN vendedores v ON v.id = ve.vendedorId;`

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar vendas"
            }).end();
        }else {
            res.status(200).json(result).end();
        }
    });
}

const total = (req, res) => {
    let query = `SELECT SUM(p.valor * v.quantidade) AS valor_total_vendas
    FROM vendas v
    JOIN produtos p ON v.produtoId = p.id;
    `

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar vendas"
            }).end();
        }else {
            res.status(200).json(result).end();
        }
    });
}
module.exports = {
    cadastrar,
    alterar,
    listar,
    excluir,
    vendas,
    total
}