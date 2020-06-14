const express = require('express');

const app = express();

app.all('*',(req,res,next)=>{
    res.status(200).end('Hello World')
});



module.exports = app;