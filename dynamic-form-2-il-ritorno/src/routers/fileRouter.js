const fs = require('fs')
const path = require('path')
const express = require('express')
const multer  = require('multer')
const router = new express.Router()
const upload = multer({ dest: path.join(__dirname,'../../public/data/uploads/') })
let getFields = multer()


let formGenerato = null

const inputTypes = ["checkbox", "date", "datetime-local", "email", "file", "image", "month", "number", 
    "password", "range", "tel", "text", "url", "week", "select"
]

const inputJsonPath = path.join(__dirname, '../json-input')

router.get('/fetchJsonFiles', (req, res, next) => {

    fs.readdir(inputJsonPath, (err, files) => {
        if(err) {
            console.error('Error reading directory:', err)
            return;
        }
        res.send(files)
    })
    
})


router.post('/createFormFile', getFields.none(), (req, res, next) => {
    console.log(req)
    fs.readFile(path.join(__dirname,'../json-input', req.body.file), 'utf8', (err, data) => {
        if (err) {
          console.error(err)
          return
        }

        try{ 
            body = JSON.parse(data)
        } catch(e) {
            //res.status(400).send("JSON invalido!")
            res.render('index', {error : "JSON invalido!"})
            return
        }
        //console.log(body)
        if(!body.campi || !body.title){
            res.render('index', {error : "Title o campi mancanti!"})
            return
        }

        if(!Array.isArray(body.campi)){
            res.render('index', {error : "Campi non è un array!"})
            return
        }

        

        //console.log(body.campi)
        for(let campo of body.campi) {
            if(!campo.nome || !campo.type){
                res.render('index', {error : "Nome o type di un campo mancanti!"})
                return
            }

            if(!inputTypes.includes(campo.type)){
                res.render('index', {error : "Type di un campo invalido: " + campo.type})
                return
            }

            if(campo.min){
                if(typeof(campo.min) !== 'number'){
                    res.render('index', {error : "Il campo min non è un numero!"})
                    return
                }
            }

            if(campo.max){
                if(typeof(campo.max) !== 'number'){
                    res.render('index', {error : "Il campo max non è un numero!"})
                    return
                }
            }

            if(campo.required){
                if(typeof(campo.required) !== 'boolean'){
                    res.render('index', {error : "Il campo required deve essere true o false!"})
                    return
                }
            }

            if(campo.options){
                if(!Array.isArray(campo.options)){
                    res.render('index', {error : "Il campo options deve essere un array!"})
                    return
                }
            }

            
        }

        /* body.campi.forEach (campo =>{
            console.log('ciao')
            if(!campo.nome || !campo.type){
                res.status(400).send("Nome o type di un campo mancante!").end()
                boolReq = true
               // console.log({res})
                return true
            }
            // return false
        }) */

        /* if(boolReq) {
            return
        } */
        
        res.render('dynamicForm', {title: body.title, campi:body.campi}, (err, html) => {
            formGenerato = html
            //console.log(formGenerato)
                    res.send(formGenerato)
            if (err) {
                console.log(err)
                return res.status(500).send("Errore nella generazione del form");
              }    
        })   

      })
    
})


// da gestire il caricamento di file multipli
router.post('/submit', getFields.any(), (req, res) => {
    console.log(req.files)
    if(req.files){
    let buffer = Buffer.from(req.files[0].buffer)
    let filePath = path.join(__dirname,'../../public/data/uploads/', Date.now() + '-' + req.body.title + '-' + req.files[0].originalname)
    fs.writeFile(filePath, buffer, (err) => {
        if (err) throw err;
        console.log("File salvato!", filePath);
      })
    delete req.files[0].buffer
    req.body['files'] = req.files
    req.body['files'][0].originalname = filePath
    }

    fs.writeFile(path.join(__dirname,'../json-output', Date.now() + '-' + req.body.title + '.json')  , JSON.stringify(req.body, null, 2) , (err) => {
        if(err) throw err
    })
    res.render('success', {message : "Dati salvati con successo!"})
})

module.exports = router