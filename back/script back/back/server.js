
const express = require('express')
const cors = require('cors')

const produtosRouter = require('./src/routes/produtos.routes')
const vendasRouter = require('./src/routes/vendas.routes')
const vendedoresRouter = require('./src/routes/vendedores.routes')

const app = express()

app.use(express.json())
app.use(cors())

app.use(produtosRouter)
app.use(vendasRouter)
app.use(vendedoresRouter)

app.listen(3000, () => {
    console.log("Respondendo na porta 3000")
})