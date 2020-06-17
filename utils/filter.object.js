exports.objFilter = (obj,...values)=>{
    const newObj = {};
    Object.keys(obj).forEach((el)=>{
        if (values.includes(el)) {
            newObj[el] = obj[el]
        }
    });

    return newObj;
}

exports.objSubtract = (obj,...values)=>{
    const newObj = {};
    Object.keys(obj).forEach((el)=>{
        if (!values.includes(el)) {
            newObj[el] = obj[el]
        }
    });

    return newObj;
}
