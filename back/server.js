const path      = require('path');
const dotenv    = require('dotenv');
const app       = require('./app');
const mongoose  = require('mongoose');

dotenv.config({path: path.join(__dirname,'config.env')});

const port  = process.env.PORT || 3000;
const DB = `${process.env.DB_STRING}:27017/cricket__`; 

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB conntection establish'));

app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
});
