import React from 'react'
import { ListItem, List } from '@material-ui/core'
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../recoil/atoms';

function Info({ classes }) {
    const currentUser = useRecoilValue(currentUserState);

    
    return (
        <List>
            <ListItem>
                <span className={classes.field}>Name:&nbsp;</span>
                <span className={classes.value}>{currentUser.name}</span>
            </ListItem>
            <ListItem>
                <span className={classes.field}>Email:&nbsp;</span>
                <span className={classes.value}>{currentUser.email}</span>
            </ListItem>
            <ListItem>
                <span className={classes.field}>Status:&nbsp;</span>
                <span className={classes.value}>{currentUser.status}</span>
            </ListItem>
        </List>
    )
}

export default Info;
