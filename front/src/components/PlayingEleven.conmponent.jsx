import React, { useState } from 'react'
import { CardContent, Typography, makeStyles, Card } from '@material-ui/core';



const useStyles = makeStyles((theme)=>({
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

function PlayingEleven({ team }) {

    const status = useState({});
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography className={classes.teamName}>
                    {team.name} 
                    <span className={classes.status}>{team.status}</span>
                </Typography>
               {team.players.map((pl)=> 
               <Typography>
                    {pl}
                </Typography>)}
            </CardContent>
        </Card>
    )
}

export default PlayingEleven
