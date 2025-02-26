const express = require('express')
const indexRouter = require('./routers/indexRouter')
const formRouter = require('./routers/formRouter')

const app = express()
app.use(express.json())
app.use(indexRouter, formRouter)

module.exports = app