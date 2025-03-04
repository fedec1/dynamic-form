const fs = require('fs')
const path = require('path')
const express = require('express')

const router = new express.Router()

let formGenerato = null



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


router.post('/createFormFile', (req, res, next) => {
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

        let boolReq = false
        // per qualche motivo
        //console.log(body.campi)
        for(let campo of body.campi) {
            if(!campo.nome || !campo.type){
                res.render('index', {error : "Nome o type di un campo mancanti!"})
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

router.post('/submit', (req, res, next) => {
    //res.send(req.body)
    fs.writeFile(path.join(__dirname,'../json-output', Date.now() + '-' + req.body.title + '.json')  , JSON.stringify(req.body, null, 2) , (err) => {
        if(err) throw err
    })
    res.render('success', {message : "Dati salvati con successo!"})
})

module.exports = router