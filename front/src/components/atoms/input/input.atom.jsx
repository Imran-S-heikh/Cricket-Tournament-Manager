import React from 'react'

export default function Input({id,type,ph,label,handler,value}) {
    return (
        <div className="">
            <label htmlFor={id}>{label}</label>
            <input onChange={handler} id={id} type={type} placeholder={ph} value={value}/>
        </div>
    )
}
