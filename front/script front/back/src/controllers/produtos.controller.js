const con = require("../dao/connect");

const cadastrar = (req, res) => {
    let data = req.body

    let query = `INSERT INTO produtos VALUES (DEFAULT, '${data.nome}', ${data.valor})`;

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
    let query = `SELECT * FROM produtos`;

    con.query(query, (err, result) => {
        if(err) {
            res.status(500).json({
                error: "Erro ao listar produtos"
            }).end();
        }else {
            res.status(200).json(result).end();
        }
    });
}

const alterar = (req, res) => {
    let { nome, valor } = req.body;

    let { id } = req.params;

    let query = `UPDATE produtos SET nome = '${nome}', valor = ${valor} WHERE id = '${id}'`;

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
    const query = `DELETE FROM produtos WHERE id = '${id}'`;

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

module.exports = {
    cadastrar,
    alterar,
    listar,
    excluir
}