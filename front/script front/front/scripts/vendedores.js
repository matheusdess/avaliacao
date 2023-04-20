const url = "http://localhost:3000"
const novo = document.querySelector("#novo")
const corpo = document.querySelector("#corpo")
const total = document.querySelector("#total")
var dados = []

function carregar() {
    fetch(url + '/vendedores/listar', { method: 'GET' })
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
        td[1].innerHTML = e.nome
        td[1].setAttribute("contenteditable", "true")
        td[2].innerHTML = e.matricula
        td[2].setAttribute("contenteditable", "true")
    
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
        "nome": novo.nome.value,
        "matricula": novo.matricula.value,
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    options.body = JSON.stringify(body)

    fetch(url + '/vendedor/criar', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 200) window.location.reload()
            else alert("erro ao enviar dados")
        })
})

function excluir(id) {
    fetch(url + '/vendedor/excluir/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 204)
                window.location.reload()
            else
                alert('Paciente não encontrado')
        })
}