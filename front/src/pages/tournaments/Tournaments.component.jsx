import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { allTournamentsState } from './tournaments.atom'
import { getTournaments } from './tournaments.api';
import TournamentCard from '../../components/TournamentCard.component';
import { makeStyles, IconButton, Tooltip, Grid } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        marginTop: 30
    },
    createTournament: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    createButton: {
        color: 'red',
    },
    tournamentContainer: {
        display: 'flex',
        width: '80%',
        margin: 'auto'
    }
}))

function Tournaments() {

    const classes = useStyles()
    const [allTournaments, setAllTournaments] = useRecoilState(allTournamentsState);

    useEffect(() => {
        getTournaments().then(res => {
            setAllTournaments(res.data.tournaments)
        }).catch(err => {
            console.log(err)
        })
    }, [])



    return (
        <div className={classes.root}>
            <div className={classes.createTournament}>
                <Link to="/createTournament">
                    <Tooltip title="Create New Tournament">
                        <IconButton className={classes.createButton}>
                            <AddCircleOutlineIcon style={{ fontSize: 50 }} />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className={classes.tournamentContainer}>
                <Grid container justify="center" spacing={3}>
                    {allTournaments.map(tournament => (
                        <Grid item xs={12} sm={6} md={4}>
                            <TournamentCard key={tournament._id} tournament={tournament} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Tournaments
