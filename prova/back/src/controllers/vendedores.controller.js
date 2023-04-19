const con = require("../dao/connect");

const cadastrar = (req, res) => {
    let data = req.body

    let query = `INSERT INTO vendedores VALUES (DEFAULT, '${data.nome}', ${data.matricula})`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao cadastrar atendimento"
            }).end();
        }else {
            data.id = result.insertId;
            
            res.status(200).json(data).end();
        }
    });
};

const listar = (req, res) => {
    let query = `SELECT * FROM vendedores`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar vendedores"
            }).end();
        }else {
            res.status(200).json(result).end();
        }
    });
}

const alterar = (req, res) => {
    let { nome, matricula } = req.body;

    let { id } = req.params;

    let query = `UPDATE vendedores SET nome = '${nome}', matricula = ${matricula} WHERE id = '${id}'`;

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
    const query = `DELETE FROM vendedores WHERE id = '${id}'`;

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

    let query = `SELECT v.nome, v.matricula, SUM(p.valor * ve.quantidade) AS total_vendas, (SUM(p.valor * ve.quantidade) * 0.05) AS comissao
    FROM vendedores v
    JOIN vendas ve ON ve.vendedorId = v.id
    JOIN produtos p ON p.id = ve.produtoId
    GROUP BY v.id`

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar vendedores"
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
    vendas
}