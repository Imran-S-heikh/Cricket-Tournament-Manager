const {objFilter,objSubtract} = require('./utils/filter.object');

const myObj = {
    name: 'imran',
    age: 18,
    sex: 'male',
    life: 'easy'
}

console.log(objFilter(myObj,'name','sex','fame'));