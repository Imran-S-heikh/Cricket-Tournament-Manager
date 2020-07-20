import React from 'react'
import { makeStyles, List, ListItem, Paper, Badge } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {

    },
    teamName: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    status: {
        fontSize: 12,
        textTransform: 'uppercase',
        marginLeft: 5,
        color: 'green'
    }
}))

function PlayingEleven({ team, active}) {

    const classes = useStyles();

    return (
        <Paper>
            <List>
                <ListItem className={classes.teamName}>
                    {team.name}
                    <span className={classes.status}>{team.status}</span>
                </ListItem>
                {team.playingEleven.map((pl) =>
                    <ListItem key={pl._id}>
                        <Badge color="secondary" variant="dot" invisible={pl._id !== active} >
                            {pl.name}
                        </Badge>
                    </ListItem>)}
            </List>
        </Paper>
    )
}

export default PlayingEleven
