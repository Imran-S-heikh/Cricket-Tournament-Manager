import React, { useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

function Popup({ open, handleClose }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (event, index) => {
        setSelectedIndex(index)
        console.log(event, index);
    }

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle>Its an Over!</DialogTitle>
            <List>
                <ListItem button disabled selected={selectedIndex === 1} onClick={(event) => handleClick(event, 1)}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText primary="Rahim Shiwekh" />
                </ListItem>
                <ListItem button selected={selectedIndex === 2} onClick={(event) => handleClick(event, 2)}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText primary="imran Iqbal" />
                </ListItem>
                <ListItem button selected={selectedIndex === 3} onClick={(event) => handleClick(event, 3)}>
                    <ListItemAvatar>
                        <Avatar/>
                    </ListItemAvatar>
                    <ListItemText primary="sadi Shiwekh" />
                </ListItem>
            </List>
        </Dialog>
    )
}

export default Popup;
