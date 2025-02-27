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
            res.status(400).send("JSON invalido!")
            return
        }
        //console.log(body)
        if(!body.campi || !body.title){
            res.status(400).send("Titolo o campi mancanti!")
            return
        }

        let boolReq = false
        // per qualche motivo
        //console.log(body.campi)
        for(let campo of body.campi) {
            if(!campo.nome || !campo.type){
                res.status(400).send("Nome o type di un campo mancante!")
                return
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

module.exports = router