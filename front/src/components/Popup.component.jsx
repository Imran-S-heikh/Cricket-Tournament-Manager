import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';

function Popup({open,handleClose}) {

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle>Its an Over!</DialogTitle>
        </Dialog>
    )
}

export default Popup;
