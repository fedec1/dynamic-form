const express = require('express')
const path = require('path')
const indexRouter = require('./routers/indexRouter')
const formRouter = require('./routers/formRouter')
const fileRouter = require('./routers/fileRouter')

const publicPath = path.join(__dirname, '../public')

const app = express()

app.use(express.json()) // parsing della richiesta json
app.use(express.urlencoded({ extended: true })) // per processare le richieste POST da browser e convertirle in un JSON
app.use(express.static(publicPath)) // usa la cartella public come root

app.use(indexRouter, formRouter, fileRouter)

module.exports = app