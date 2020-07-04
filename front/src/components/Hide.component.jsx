import React from 'react'

function Hide({hide = true,children}) {
    if (hide) {
        return null;
    }
    return (
        <>
           {children} 
        </>
    )
}

export default Hide;
