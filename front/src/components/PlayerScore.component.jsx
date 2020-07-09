import React from 'react';
import { Card, CardContent, Divider, Box, makeStyles } from '@material-ui/core';

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
                {player.score.map(el =>
                    <Box mt={1}>
                        {el.map(value =>
                            <span>
                                <span className={classes[value]}>{value}</span>
                                &nbsp; + &nbsp;
                            </span>)}
                        <Divider/>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}

export default PlayerScore;
export {useStyles};
