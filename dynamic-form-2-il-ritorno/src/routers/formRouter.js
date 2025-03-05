const express = require('express')
const fs = require('fs')
const path = require('path')
const router = new express.Router()
const multer  = require('multer')

let formGenerato = null

let getFields = multer()

const inputTypes = ["checkbox", "date", "datetime-local", "email", "file", "image", "month", "number", 
    "password", "range", "tel", "text", "url", "week", "select"
]

router.post('/createForm', getFields.none(), (req, res, next) => {
    console.log(req.body)
    // controlo sulla validità del json
    try{
        body = JSON.parse(req.body.jsonForm)
    } catch(e) {
        res.render('index', {error : "JSON invalido!"})
        return
    }

    // controllo sull'esistenza del titolo e dei campi
    if(!body.campi || !body.title){
        res.render('index', {error : "Title o campi mancanti!"})
        return
    }

    if(!Array.isArray(body.campi)){
        res.render('index', {error : "Campi non è un array!"})
        return
    }

    // controllo sull'esistenza di un nome e un type per ogni campo
    for(let campo of body.campi) {
        if(!campo.nome || !campo.type){
            res.render('index', {error : "Nome o type di un titolo mancanti!"})
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
    
    // console.log(req.body.jsonForm.title)
    fs.writeFile(path.join(__dirname,'../json-input', body.title + '.json')  , JSON.stringify(body, null, 2) , (err) => {
            if(err) throw err
        })
        res.render('success', {message : "JSON salvato con successo!"})   
})







module.exports=router