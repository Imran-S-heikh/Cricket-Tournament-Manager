const path      = require('path');
const dotenv    = require('dotenv');
const app       = require('./app');

dotenv.config({path: path.join(__dirname,'config.env')});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
});
