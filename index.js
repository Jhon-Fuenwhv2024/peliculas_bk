const express = require('express')
const {getConnection} = require('./db/db-connect-mongo');
const cors = require('cors');
require('dotenv').config();


const app = express()
const port = process.env.PORT;

// implementamos cors
app.use(cors());

getConnection();


//Parseo de los datos a JSON

app.use(express.json());

app.use('/media', require('./router/media'));
app.use('/productora', require('./router/productora'));
app.use('/genero', require('./router/genero'));
app.use('/director', require('./router/director'));
app.use('/tipo', require('./router/tipo'));


app.listen( port, () =>{
    console.log('App listening on port 3001!')
});