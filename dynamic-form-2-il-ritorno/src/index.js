const app = require('./app')
const path = require('path')
const hbs = require('hbs')

// salvo le directory public, views e partials in una variabile
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('views', viewsPath) // setta la cartella delle views 
app.set('view engine', 'hbs') // tipo di template engine
hbs.registerPartials(partialsPath) // registrazione dei partials

port = process.env.PORT // porta presa da config

app.listen(port, () => console.log(`Server running on port ${port}`)) // creazione server