import React from 'react'
import { useEffect } from 'react'
import { getTournament } from '../pages/tournaments/tournaments.api'
import { useState } from 'react'
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, makeStyles, FormGroup, FormControlLabel, Checkbox, Button, Divider } from '@material-ui/core'
import { getTeam } from '../pages/teams/teams.api'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    root: {
        width: 600,
        margin: 'auto'
    },

}))

const initialTeam = {
    name: '',
    playingEleven: []
}

function MatchStart() {
    const history = useHistory();

    const [tournament, setTournament] = useState([])
    const [teams, setTeams] = useState([])

    const [teamOneId, setTeamOneId] = useState('');
    const [teamOne, setTeamOne] = useState({ players: [] });
    const [teamOneMatch, setTeamOneMatch] = useState(initialTeam);

    const [teamTwoId, setTeamTwoId] = useState('');
    const [teamTwo, setTeamTwo] = useState({ players: [] });
    const [teamTwoMatch, setTeamTwoMatch] = useState(initialTeam);


    const [match, setMatch] = useState({});
    const [tossWon,setTossWon] = useState('');
    const [electedTo,setElectedTo] = useState('');

    const classes = useStyles();

    useEffect(() => {
        async function fetChData() {
            const tourna = await getTournament('5f1417cb4ae52818f1d2098f');
            if (tourna) {
                setTournament(tourna)
                setTeams(tourna.teams)
                setMatch({...match,tournament: tourna._id})
                tourna.teams.map(({ team }) => {
                    console.log(team.name)
                })
            }
        }
        fetChData();
    }, [])

    const handleTeamOne = async (event) => {
        setTeamOneId(event.target.value);

        const team = await getTeam(event.target.value);
        setTeamOneMatch({...teamOneMatch,id: team._id,name: team.name})
        setTeamOne(team);
    }

    const handleTeamTwo = async (event) => {
        setTeamTwoId(event.target.value);

        const team = await getTeam(event.target.value);
        setTeamTwoMatch({...teamTwoMatch,id: team._id,name: team.name})
        setTeamTwo(team);
    }

    const addPlayer = (type, event) => {
        const team = type === 'teamOne' ? teamOne : teamTwo;
        const teamMatch = type === 'teamOne' ? teamOneMatch : teamTwoMatch;
        let newPlayer = [];
        team.players.map(({ player }) => {
            if (player._id === event.target.id) {
                newPlayer.push(player)
            }
        })
        type === 'teamOne' ? setTeamOneMatch({ ...teamMatch, playingEleven: [...teamMatch.playingEleven, ...newPlayer] })
            : setTeamTwoMatch({ ...teamMatch, playingEleven: [...teamMatch.playingEleven, ...newPlayer] })
    }

    const removePlayer = (type, event) => {
        const team = type === 'teamOne' ? teamOne : teamTwo;
        const teamMatch = type === 'teamOne' ? teamOneMatch : teamTwoMatch;
        const newPlayers = teamMatch.playingEleven.filter(player => player._id !== event.target.id)
        type === 'teamOne' ? setTeamOneMatch({ ...teamMatch, playingEleven: newPlayers })
            : setTeamTwoMatch({ ...teamMatch, playingEleven: newPlayers })
    }

    const handleCheckBox = (team, event) => {
        if (event.target.checked) {
            addPlayer(team, event)
        } else {
            removePlayer(team, event)
        }
    }

    const handleSubmit = ()=>{
        const data = {
            ...match,
            toss: {
                tossWon,
                electedTo
            },
            tossWonTeam: teamOneMatch.id === tossWon ? teamOneMatch : teamTwoMatch,
            tossLoseTeam: teamTwoMatch.id !== tossWon ? teamTwoMatch : teamOneMatch
        }

        console.log()

        Axios({
            method: "POST",
            url: 'api/v1/matches',
            data
        }).then(res=>{
            console.log(res.data.match)
            history.push(`/match/${res.data.match._id}`)
            
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            <h1>Start Match</h1>
            <Divider/>
            <h2 style={{color: 'lightgrey'}}>{tournament.name}</h2>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Select a team</InputLabel>
                        <Select value={teamOneId} onChange={handleTeamOne}>
                            {teams.map(({ team }) =>
                                <MenuItem disabled={teamTwoId === team._id} key={team._id} value={team._id}>{team.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Select a team</InputLabel>
                        <Select value={teamTwoId} onChange={handleTeamTwo}>
                            {teams.map(({ team }) =>
                                <MenuItem disabled={teamOneId === team._id} key={team._id} value={team._id}>{team.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <p>Select {teamOne.name} Playing Eleven</p>
                    <FormGroup>
                        {
                            teamOne.players.map(({ player }) => (
                                <FormControlLabel
                                    key={player._id}
                                    control={
                                        <Checkbox color="primary" onChange={e => handleCheckBox('teamOne', e)} id={player._id} />
                                    }
                                    label={player.name}
                                />
                            ))
                        }
                    </FormGroup>
                </Grid>
                <Grid item xs={6}>
                    <p>Select {teamTwo.name} Playing Eleven</p>
                    <FormGroup>
                        {
                            teamTwo.players.map(({ player }) => (
                                <FormControlLabel
                                    key={player._id}
                                    control={
                                        <Checkbox color="primary" onChange={e => handleCheckBox('teamTwo', e)} id={player._id} />
                                    }
                                    label={player.name}
                                />
                            ))
                        }
                    </FormGroup>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Toss Win Team</InputLabel>
                        <Select value={tossWon} onChange={e=>setTossWon(e.target.value)}>
                            {teams.map(({ team }) =>
                                <MenuItem key={team._id} value={team._id}>{team.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Elected To </InputLabel>
                        <Select value={electedTo} onChange={e=>setElectedTo(e.target.value)}>
                                <MenuItem value="batting">Batting</MenuItem>
                                <MenuItem value="bowling">Bowling</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={handleSubmit} fullWidth>Start Match</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default MatchStart
