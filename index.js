const cookieParser = require('cookie-parser');

const express = require('express');
const path = require('path');
const port = 4001;
const db = require('./config/mongoose');



const app = express();


//i told index.js to use these routes
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use('/',require('./routes'))
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port: ${port}`)
})