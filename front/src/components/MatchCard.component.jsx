import React from 'react';
import { Card, CardContent, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    root: {
        position: 'relative',
        width: 'max-content'
    },
    teamName: {
        padding: '5px',
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: '5px'
    },
    tournamentName: {
        fontWeight: 'bold',
        margin: '6px 0 6px 0',
        color: '#343a45',
        fontSize: '18px'
    },
    time: {
        fontSize: '12px',
        marginTop: '15px'
    },
    timeFromNow: {
        color: 'green',
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: 12
    }
}))

function MatchCard() {
    const classes = useStyles();

    return (
        <Card className={ classes.root }>
            <CardContent>
                <Typography className={classes.tournamentName}>
                    Boishakhi Flix Cup
                </Typography>
                <Typography className={classes.title}>
                    <span className={classes.teamName}>Bong Team</span>
                    <span style={{padding: '0 6px 0 6px'}}>VS</span>
                    <span className={classes.teamName}>Putu Beam</span>
                </Typography>
                <Typography className={classes.timeFromNow}>
                    30 mins from now
                </Typography>
                <Typography className={classes.time}>
                    Time:&nbsp; 5th-sept,2020 <br/>
                    Venue: Mollahat
                </Typography>
               
            </CardContent>
        </Card>
    )
}

export default MatchCard
