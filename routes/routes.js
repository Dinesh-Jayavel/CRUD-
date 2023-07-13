const express = require('express');

let Model = require('../model/model')

const app = express.Router()

app.use(express.json());

app.post('/register', async(req, res) => {
    // Validation using schema
    let values = new Model({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        number: req.body.number,
        date: req.body.date
    })
    try{
        let result = await values.save()
        console.log(result)
        res.json(result)
    }
    catch(e){
        res.json({
            message: "Please enter valid details"
        })
    }
})

app.get('/getData', async(req, res) => {
    try{
        let result = await Model.find()
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.get('/getById/:id', async(req, res) => {
    try{
        let result = await Model.findById(req.params.id)
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.patch('/update/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        let result = await Model.findByIdAndUpdate(id, updatedData, options)
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;

        let result = await Model.findByIdAndDelete(id)
        res.json({
            status: 'success',
            data: 'Data deleted successfully !'
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})


module.exports = app;