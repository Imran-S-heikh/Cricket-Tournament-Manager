import React, { useEffect } from 'react';
import PlayingEleven from '../components/PlayingEleven.conmponent';
import { makeStyles, Box, Button, Card, CardContent } from '@material-ui/core';
import ScoreUpdater from '../components/ScoreUpdater.component';
import { useState } from 'react';
import PlayerScore from '../components/PlayerScore.component';
import Highlight from '../components/Highlight.component';
import Popup from '../components/Popup.component';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        overflowX: "hidden"
    },
    scoreUpdater: {
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translate(-50%,0)'
    }
}));

function Match() {

    const classes = useStyles();
    const teams = ['37884', '34839']
    const [battingTeam, setBattingTeam] = useState(teams[0]);
    const [bowlingTeam, setBowlingTeam] = useState(teams[1]);
    const [popup,setPopup] = useState(false);


    const [teamOne, setTeamOne] = useState({
        name: 'Bangladesh',
        captain: 'John Cina',
        status: 'batting',
        players: [
            'Tamim Iqbal',
            'Shakib Al Hansan',
            'Saif The Boss',
            'Liton The Perfect Timer',
            'Soumya The Huge',
            'Musi The Dependable'
        ]
    });

    const [teamTwo, setTeamTwo] = useState({
        name: 'India',
        captain: 'Koli The Wall',
        status: 'bowling',
        players: [
            'Yousuf',
            'Yadav',
            'Rhoit Sharma',
            'Menk',
            'Pandiya',
            'Dilip'
        ]
    });

    const [score,setScore] = useState([]);

    const [player,setPlayer] = useState({
        name: 'Iqbal Khan',
        score: [
            [0,1,4],
            [0]
        ]
    });

    const playerBowler = {
        name: 'Pandiya',
        score: [
            [ 0, 4, 2, 0, 'w', 4 ]
        ]
    }

    const scoreUpdates = [
        {
            type: 4,
            value: 4
        },
        {
            type: 'w',
            value: 'wicket'
        },
        {
            type: 1,
            value: 1
        },
        {
            type: 2,
            value: 2
        }
    ];
    const scoreUpdatesExtra = [4, 'NB', 1, 2, 3];

    const endOfInnings = () => {
        setBattingTeam(bowlingTeam);
        setBowlingTeam(battingTeam);
    }

    const handleUpdate = (event) => {
        if (player.score[player.score.length - 1].length > 6) {
            setPopup(true);
            return;
        }
        setPlayer({...player,score:[player.score[0],player.score[1].concat(event.currentTarget.getAttribute('data-score'))]});
        handleScore(event.currentTarget.getAttribute('data-score'))
    }

    const handleScore = (newScore)=>{
        setScore([...score,newScore])
    }

    const handleClose = () => {
        setPopup(false);
    }

    return (
        <div className={classes.root}>
            <Box component="h1" textAlign="center">
                Boidhakhi Tournamet
            </Box>
            <Box>
                Total: 238
            </Box>
            <Box display="flex" flexGrow={1} mt={2}>
                <PlayingEleven team={teamOne} />
                <PlayerScore player={player}/>
                {/* <Box flexGrow={1} >
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="column">
                            <Box component="span" textAlign="center">Extra</Box>
                            <ScoreUpdater updates={scoreUpdatesExtra} />
                            <Button onClick={endOfInnings}>End of Innings</Button>
                        </Box>
                    </Box>
                </Box> */}
                <Box flexGrow={1}></Box>
                <PlayerScore player={playerBowler}/>
                <PlayingEleven team={teamTwo} />
            </Box>
            <Box display="flex" mt={4} >
                <span>Highlight: &nbsp;</span>
                <Highlight score={score}/>
            </Box>
            <Box className={classes.scoreUpdater}>
                <ScoreUpdater updates={scoreUpdates} handler={handleUpdate} size="large" />
            </Box>
            <Popup open={popup} handleClose={handleClose}/>
        </div>
    )
}

export default Match
