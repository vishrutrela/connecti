//require the library
const mongoose = require('mongoose');
//connect mongoose to the database
mongoose.connect('mongodb+srv://vishrutrela:IAMNITIAN@cluster0.idwtat0.mongodb.net/ConnectEye_dev?retryWrites=true&w=majority');
//check the connection(to check it is successful)
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console,'errorconnecting to data base'));
//up and running ,then print he message
db.once('open',()=>{
    console.log('successfully connect to the database');
});

module.exports = db;