import React, { useState } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

function Popup({ popup,players, next }) {
    const [lastBowler, setLastBowler] = useState(null);
    const [outBatsman,setOutBatsman] = useState([]);

    const handleClick = ({currentTarget: {id,textContent}}) => {
        checkBatsman(popup.type) ? setOutBatsman([...outBatsman,id]) : setLastBowler(id);
        next({ name: textContent, id },popup.type);  
    }

    const checkBatsman = (type) => {
        return type == 'striker' || type == 'non-striker'
    }

    return (
        <Dialog open={popup.status}>
            <DialogTitle>{popup.title}</DialogTitle>
            <List>
                {players.map((player) => {
                    const disabled = checkBatsman(popup.type) ? outBatsman.includes(player.id) : lastBowler == player.id;

                    return (
                        <ListItem key={player.id} id={player.id} button disabled={disabled} onClick={(event) => handleClick(event, player.id)}>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText primary={player.name} />
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    )
}

export default Popup;
