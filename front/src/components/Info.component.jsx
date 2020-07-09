import React from 'react'
import { ListItem, List } from '@material-ui/core'

function Info({classes}) {
    return (
        <List>
            <ListItem>
                <span className={classes.field}>Name:&nbsp;</span>
                <span className={classes.value}>Imran Sheikh</span>
            </ListItem>
            <ListItem>
                <span className={classes.field}>Email:&nbsp;</span>
                <span className={classes.value}>imransheikhsadi2@gmail.com</span>
            </ListItem>
            <ListItem>
                <span className={classes.field}>Status:&nbsp;</span>
                <span className={classes.value}>Busy</span>
            </ListItem>
        </List>
    )
}

export default Info;
