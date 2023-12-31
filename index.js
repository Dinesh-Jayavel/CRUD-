const express = require('express');
const mongoose = require('mongoose');
let cors = require('cors')
const app =express();
app.use(cors())

require('dotenv').config();

const routes = require('./routes/routes');
app.use('/api', routes)

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})