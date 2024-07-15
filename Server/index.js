const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

//database conection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('functioneaza baza de date'))
.catch((err)=>console.log('nu functioneaza baza de date', err))

//midleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));



app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`))


