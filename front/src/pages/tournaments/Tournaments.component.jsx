import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { allTournamentsState } from './tournaments.atom'
import { getTournaments } from './tournaments.api';
import TournamentCard from '../../components/TournamentCard.component';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative'
    },
    createTournament: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    createButton: {
        color: 'red',
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
            <div className="">
                <TournamentCard />
            </div>
        </div>
    )
}

export default Tournaments
