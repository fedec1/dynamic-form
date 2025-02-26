const express = require('express')

const router = new express.Router()

let formGenerato = null

router.post('/createForm', (req, res, next) => {
    body = JSON.parse(req.body.jsonForm)
    // console.log(req.body.jsonForm.title)
    res.render('dynamicForm', {title: body.title, campi:body.campi}, (err, html) => {
        formGenerato = html
        res.send(formGenerato)
    })   
})



module.exports=router