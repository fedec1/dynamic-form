const app = require('./app')
const path = require('path')
const hbs = require('hbs')
const cron = require('node-cron');
const { exec } = require('child_process');
const multer  = require('multer')

//const hljs = require('highlight.js/lib/core')


// salvo le directory public, views e partials in una variabile

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('views', viewsPath) // setta la cartella delle views 
app.set('view engine', 'hbs') // tipo di template engine
hbs.registerPartials(partialsPath) // registrazione dei partials

hbs.registerHelper('eqSelect', (type) => type == "select")
hbs.registerHelper('eqCheck', (type) => type == "checkbox")
hbs.registerHelper('eqFile', (type) => type == "file")
//hljs.registerLanguage("json", require('highlight.js/lib/languages/json'))

port = process.env.PORT // porta presa da config

app.listen(port, () => console.log(`Server running on port ${port}`)) // creazione server

cron.schedule('* * * * *', () => {
    exec('npm run scheDel', function(err,stdout,stderr) {
        console.log(stdout);
    })
    console.log("Eliminazione...");
  })
