import React, { useState } from 'react'
import { Drawer, Box, IconButton, makeStyles } from '@material-ui/core';
import Close from '../components/Close.component';
import { useHistory } from 'react-router-dom';

const drawerWidth = '100%';

const useStyles = makeStyles(() => ({
    root: {
        position: 'static'
    },
    drawerPaper: {
        width: drawerWidth,
        position: 'static'
    },
    closeIcon: {

    }
}))

function Profile() {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const history = useHistory();

    return (
      <div className="">
          This is sthe profiel is nnot good at all
      </div> 
    )
}

export default Profile
