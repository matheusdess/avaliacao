const url = "http://localhost:3000"
const novo = document.querySelector("#novo")
const corpo = document.querySelector("#corpo")
const total = document.querySelector("#total")
var dados = []

function carregar() {
    fetch(url + '/vendas/vendas', { method: 'GET' })
        .then(resp => resp.json())
        .then(resp => {
            dados = resp
            preencherTabela()
        })
        .catch(err => alert(err));
}

function preencherTabela() {
    dados.forEach((e) => {
        let linha = document.createElement("tr")
        linha.setAttribute('id', 'linha' + e.id)
        let td = []
        for (let i = 0; i < 10; i++) {
            td.push(document.createElement("td"))
            //Adicionar o atributo data-label para responsividade css

            // if (i < 8) td[i].setAttribute("data-label", Object.keys(e)[i].charAt(0).toUpperCase() + Object.keys(e)[i].substr(1)+":")
            // else if (i == 8) td[i].setAttribute("data-label", "Alterar:")
            // else td[i].setAttribute("data-label", "Excluir:")
        }
        td[0].innerHTML = e.id
        td[1].innerHTML = e.data.split("T")[0]
        td[1].setAttribute("contenteditable", "true")
        td[2].innerHTML = e.quantidade
        td[2].setAttribute("contenteditable", "true")
        td[3].innerHTML = e.nome_produto
        td[3].setAttribute("contenteditable", "true")
        td[4].innerHTML = e.nome_vendedor
        td[4].setAttribute("contenteditable", "true")

        
        
        let btUpdate = document.createElement('button')
        btUpdate.innerHTML = '*'
        btUpdate.setAttribute('onclick', `alterar(${e.id})`)
        td[5].appendChild(btUpdate)
        let btDel = document.createElement('button')
        btDel.innerHTML = '-'
        btDel.setAttribute('onclick', `excluir(${e.id})`)
        td[6].appendChild(btDel)

        for (let i = 0; i < 10; i++)
            linha.appendChild(td[i])
        corpo.appendChild(linha)
    })
}

novo.addEventListener('submit', e => {
    e.preventDefault()
    const body = {
        "quantidade": novo.quantidade.value,
        "produtoId": novo.produto.value,
        "vendedorId": novo.vendedor.value,
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    options.body = JSON.stringify(body)

    fetch(url + '/venda/criar', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) window.location.reload()
            else alert("erro ao enviar dados")
        })
})

function excluir(id) {
    fetch(url + '/venda/excluir/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 204)
                window.location.reload()
            else
                alert('Paciente não encontrado')
        })
}

function alterar(id) {
    let linha = document.querySelector(`#linha${id}`)
        const body = {
            "id": id,
            // "data": linha.querySelector('#data').innerHTML,
            "quantidade": Number(linha.childNodes[1].innerHTML),
            "produtoId": linha.childNodes[2].innerHTML,
            "vendedorId": linha.childNodes[3].innerHTML,
        }
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        options.body = JSON.stringify(body)

        fetch(url + '/venda/alterar/'+id, options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 202) window.location.reload()
                else alert('Erro ao alterar dados')
            })
}