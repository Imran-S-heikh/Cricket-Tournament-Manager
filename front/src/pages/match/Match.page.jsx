import React from 'react';
import PlayingEleven from '../../components/PlayingEleven.conmponent';
import { makeStyles, Box, Button } from '@material-ui/core';
import ScoreUpdater from '../../components/ScoreUpdater.component';
import { useState } from 'react';
import PlayerScore from '../../components/PlayerScore.component';
import Highlight from '../../components/Highlight.component';
import Popup from '../../components/Popup.component';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalScoreState,teamOneState,teamTwoState, currentBatsmanState, currentBowlerState } from './match.atom';

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


const scoreUpdatesExtra = [
    {
        type: 4,
        value: 4
    },
    {
        type: 'wd',
        value: 'wide'
    },
    {
        type: 'nb',
        value: 'no ball'
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
    },
    {
        type: 3,
        value: 3
    }
];


function Match() {

    const teamOne = useRecoilValue(teamOneState);
    const teamTwo = useRecoilValue(teamTwoState);

    const classes = useStyles();
    const totalScore = useRecoilValue(totalScoreState);
    const [currentBatsman,setCurrentBatsman] = useRecoilState(currentBatsmanState);
    const [currentBowler,setCurrentBowler] = useRecoilState(currentBowlerState);


    const resetCurrentBowler = (obj) => {
        setCurrentBowler({...obj,score: [],legalDeliviries: 0})
    }

    const resetCurrentBatsman = (obj) => {
        console.log(obj,'reset')
        setCurrentBatsman({...currentBatsman,striker: {...obj,score: []}});
    }

    const resetNonStriker = (obj) => {
        setCurrentBatsman({...currentBatsman,nonStriker: {...obj,score: []}});
    }

    const next = (obj, type) => {
        console.log(obj, type)
        if (type === 'bowler') {
            resetCurrentBowler(obj)
        } else if (type === 'striker') {
            resetCurrentBatsman(obj)
        } else if (type === 'non-striker') {
            resetNonStriker(obj)
        }
    }

    return (
        <div className={classes.root}>
            <Box component="h1" textAlign="center">
                Boidhakhi Tournamet
            </Box>
            <Box>
                <span>{teamOne.name}: &nbsp;</span>
                <span>{totalScore.run}&nbsp;/&nbsp;{totalScore.wicket}</span>
            </Box>
            <Box display="flex" flexGrow={1} mt={2}>
                <PlayingEleven team={teamOne} active={currentBatsman.striker.id}/>
                <PlayerScore player={currentBatsman.striker} />
                <Box flexGrow={1} >
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="column">
                            <Box component="span" textAlign="center">Extra</Box>
                            <ScoreUpdater updates={scoreUpdatesExtra} extra={true}/>
                            <Button>End of Innings</Button>
                        </Box>
                    </Box>
                </Box>
                <Box flexGrow={1}></Box>
                <PlayerScore player={currentBowler} />
                <PlayingEleven team={teamTwo} active={currentBowler.id}/>
            </Box>
            <Box display="flex" mt={4} >
                <span>Highlight:&nbsp;</span>
                <Highlight />
            </Box>
            <Box className={classes.scoreUpdater}>
                <ScoreUpdater updates={scoreUpdates} size="large" />
            </Box>
            <Popup next={next} />
        </div>
    )
}

export default Match;
