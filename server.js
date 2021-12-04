const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const asyncHandler = require('./middlewares/error')
const path = require('path')

//Configuring DOTENV
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 3000


//Require Route Files
const user = require('./route/user')
const { urlencoded } = require('body-parser')

//Initializations
const app = express();

//Setting Engine
app.set('view engine', 'ejs');

//Connecting Database
connectDB();

//Use Server Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))


//API routes
app.use('/api/v1', user)

//Requiring Middlewares
app.use(errorHandler)



//Listen To Port
app.listen(PORT, function () {
    console.log(`Server Started at Port ${PORT}`);

})