import React from 'react'
import TeamCard from '../../components/TeamCard.component'
import { Tooltip, IconButton, makeStyles, Grid } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { allTeamState } from './teams.atom';
import { useEffect } from 'react';
import { getAllTeams } from './teams.api';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        marginTop: 30
    },
    createTeam: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    teamsContainer: {
        display: 'flex',
        width: '80%',
        margin: 'auto'
    }
}))


function Teams() {
    const classes = useStyles()
    const [allTeams, setAllTeams] = useRecoilState(allTeamState);

    useEffect(() => {
        getAllTeams().then(res => {
            setAllTeams(res.data.teams)
            console.log(res.data.teams)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.createTeam}>
                <Link to="/createTeam">
                    <Tooltip title="Create New Team">
                        <IconButton className={classes.createButton}>
                            <AddCircleOutlineIcon style={{ fontSize: 50 }} />
                        </IconButton>
                    </Tooltip>
                </Link>
            </div>
            <div className={classes.teamsContainer}>
                <Grid container justify="center" spacing={3}>
                    {allTeams.map(team => (
                        <Grid item xs={12} sm={6} md={4}>
                            <TeamCard key={team._id} team={team} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Teams
