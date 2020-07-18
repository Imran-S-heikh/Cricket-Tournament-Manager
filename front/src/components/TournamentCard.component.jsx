import React from 'react'
import { Card, makeStyles, CardContent, CardActions, Typography, Button, Box, ListItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'max-content',
        // textAlign: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    joinButton: {
        margin: 'auto'
    },
    placeholder: {
        // color: 'grey',
        display: 'block',
        backgroundColor: 'rgba(0,0,0,.3)',
        fontWeight: 'bold'
    },
    cardBody: {
        textAlign: 'center',
        display: 'flex'
    },
    indexName: {
        color: 'lightgrey',
        fontWeight: 'bold'
    }
}))

function TournamentCard({ tournament }) {
    const { firstPrize, secondPrize, thirdPrize } = tournament;
    const classes = useStyles();

    const prizes = ['iPhone !!', 'Samsing J2', '#2Inch Monitor']

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.name}>
                    {tournament.name}
                </Typography>
                <Typography className={classes.cardBody}>
                    <Box flexGrow={1}>
                        <span className={classes.placeholder}>Prizes</span>
                        {[firstPrize, secondPrize, thirdPrize].map((prize, i) =>
                            <Box textAlign="left">
                                <span className={classes.indexName}>{i}.</span> {prize}
                            </Box>
                        )}
                    </Box>
                    <Box width={10}></Box>
                    <Box flexGrow={1}>
                        <span className={classes.placeholder}>Venue</span>
                        <Box>
                            <span>{tournament.place}</span>
                        </Box>
                    </Box>
                </Typography>
                <Typography style={{ textAlign: 'center' }}>
                    <span className={classes.placeholder}>Time</span>
                    <Box>
                        <span style={{ fontSize: 14, fontWeight: 'bold' }}>{tournament.startDate}</span><br />
                        <span style={{ fontSize: 12, color: 'orangered' }}>6 hours from now</span>
                    </Box>
                </Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth variant="contained" startIcon={<AddIcon />} >
                    Join Tournament
                </Button>
            </CardActions>
        </Card>
    )
}

export default TournamentCard
