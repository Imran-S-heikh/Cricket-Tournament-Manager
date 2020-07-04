import React from 'react'
import { IconButton, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


function Close ({close}){
    return (
        <Box>
            <IconButton onClick={close}>
                <CloseIcon/>
            </IconButton>
        </Box>
    )
}

export default Close
