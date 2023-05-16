//require the library
const mongoose = require('mongoose');
//connect mongoose to the database
mongoose.connect('mongodb://127.0.0.1:27017/ConnectEye_dev');
//check the connection(to check it is successful)
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console,'errorconnecting to data base'));
//up and running ,then print he message
db.once('open',()=>{
    console.log('successfully connect to the database');
});