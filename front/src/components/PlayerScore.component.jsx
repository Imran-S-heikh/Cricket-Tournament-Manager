import React from 'react';
import { Card, CardContent, Divider, Box, makeStyles } from '@material-ui/core';
import { v4 as uniqId } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    w: {
        color: 'orangered'
    },
    4: {
        color: 'green'
    },
    nb: {
        color: 'orange'
    }
}))

function PlayerScore({ player }) {

    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Box py="4px" fontWeight="bold">{player.name}</Box>
                <Divider />
                <Box mt={1} key={uniqId()}>
                    {player.score.map(value =>
                        <span key={uniqId()}>
                            <span className={classes[value]}>{value}</span>
                                &nbsp; + &nbsp;
                        </span>
                    )}
                    <Divider />
                </Box>
            </CardContent>
        </Card>
    )
}

export default PlayerScore;
export { useStyles };
