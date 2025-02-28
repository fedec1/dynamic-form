const express = require('express')

const router = new express.Router()

let formGenerato = null

router.post('/createForm', (req, res, next) => {

    // controlo sulla validità del json
    try{
        body = JSON.parse(req.body.jsonForm)
    } catch(e) {
        res.status(400).send("JSON invalido!")
        return
    }

    // controllo sull'esistenza del titolo e dei campi
    if(!body.campi || !body.title){
        res.status(400).send("Titolo o campi mancanti!")
        return
    }

    // controllo sull'esistenza di un nome e un type per ogni campo
    body.campi.forEach(campo =>{
        if(!campo.nome || !campo.type){
            res.status(400).send("Nome o type di un campo mancante!")
        }
    })
    
    // console.log(req.body.jsonForm.title)
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







module.exports=router