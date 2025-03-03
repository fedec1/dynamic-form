const express = require('express')
const fs = require('fs')
const path = require('path')
const router = new express.Router()

let formGenerato = null

router.post('/createForm', (req, res, next) => {

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

    // controllo sull'esistenza di un nome e un type per ogni campo
    for(let campo of body.campi) {
        if(!campo.nome || !campo.type){
            res.render('index', {error : "Nome o type di un titolo mancanti!"})
            return
        }
    }
    
    // console.log(req.body.jsonForm.title)
    fs.writeFile(path.join(__dirname,'../json-input', body.title + '.json')  , JSON.stringify(body, null, 2) , (err) => {
            if(err) throw err
        })
        res.render('successpreset')   
})







module.exports=router