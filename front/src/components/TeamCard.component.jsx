import React, { useState } from 'react'
import { Card, CardActions, Button, CardContent, Typography, makeStyles, Divider, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../recoil/atoms';
import Axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        margin: 'auto'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    placeholder: {
        color: 'grey'
    },
    value: {
        fontWeight: 'bold'
    },
    cardBody: {
        fontWeight: 'bold',
        fontSize: 14
    }
}))

function TeamCard({ team }) {
    const classes = useStyles();
    const currentPlayer = useRecoilValue(currentUserState);
    const [join, setJoin] = useState(false);
    const [message,setMessage] = useState('Request Pending');

    useEffect(()=>{
        if (currentPlayer) {
            team.players.map(el=>{
                if (el.player === currentPlayer._id) {
                    setJoin(true);
                    el.status === 'approved' && setMessage('Current Team')
                }
            })
        }
    },[])

    const handleClick = () => {
        Axios({
            method: 'POST',
            url: `api/v1/players/join/${team._id}`
        }).then(res=>{
            setJoin(true);
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    {team.name}
                </Typography>
                <Divider />
                <Typography className={classes.cardBody}>
                    <Box>
                        <span className={classes.placeholder}>Captain: </span>
                        <span className={classes.value}>{team.captain.name}</span>
                    </Box>
                    <Box>
                        <span className={classes.placeholder}>Trophies: </span>
                        <span className={classes.value}>{team.trophies ? team.trophies : 0} 👑</span>
                    </Box>
                    <Box>
                        <span className={classes.placeholder}>Members: </span>
                        <span className={classes.value}>{team.players.length} 🙅</span>
                    </Box>
                </Typography>
            </CardContent>
            <CardActions>
                {join ?
                    <Button variant="contained" startIcon={<DoneRoundedIcon />} fullWidth>
                        {message}
                    </Button> :
                    <Button onClick={handleClick} variant="contained" startIcon={<AddIcon />} fullWidth>
                        Join Team
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default TeamCard
