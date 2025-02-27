const express = require('express')

const router = new express.Router()

let formGenerato = null

router.post('/createForm', (req, res, next) => {
    try{
        body = JSON.parse(req.body.jsonForm)
    } catch(e) {
        res.status(400).send("JSON invalido!")
        return
    }

    if(!body.campi || !body.title){
        res.status(400).send("Titolo o campi mancanti!")
        return
    }
    
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