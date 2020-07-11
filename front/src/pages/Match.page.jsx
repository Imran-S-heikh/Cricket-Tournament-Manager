import React, { useEffect } from 'react';
import PlayingEleven from '../components/PlayingEleven.conmponent';
import { makeStyles, Box, Button } from '@material-ui/core';
import ScoreUpdater from '../components/ScoreUpdater.component';
import { useState } from 'react';
import PlayerScore from '../components/PlayerScore.component';
import Highlight from '../components/Highlight.component';
import Popup from '../components/Popup.component';

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

    const [teamOne, setTeamOne] = useState({
        name: 'Bangladesh',
        captain: 'John Cina',
        status: 'batting',
        players: [
            {name:'Tamim Iqbal',id: '9347'},
            {name:'Shakib Al Hansan',id: '3434'},
            {name:'Saif The Boss',id: '4434'},
            {name:'Liton The Perfect Timer',id: '5675'},
            {name:'Soumya The Huge',id: '567'},
            {name:'Musi The Dependable',id: '3478'}
        ]
    });

    const [teamTwo, setTeamTwo] = useState({
        name: 'India',
        captain: 'Koli The Wall',
        status: 'bowling',
        players: [
            {name:'Pathan',id: '9347'},
            {name:'Kohli',id: '3434'},
            {name:'MS Dhoni',id: '4434'},
            {name:'hardik Pandiya',id: '5675'},
            {name:'Vhuben Kumar',id: '567'},
            {name:'Rohit Sharma',id: '3478'}
        ]
    });

    const classes = useStyles();
    const teams = [teamOne, teamTwo];
    const [battingTeam, setBattingTeam] = useState(teams[0]);
    const [bowlingTeam, setBowlingTeam] = useState(teams[1]);
    const [popup,setPopup] = useState({title: '', status: false, batsman: true});
    const [popupList,setPopupList] = useState([]);
    const [nextPopup,setNextPopup] = useState(false);

    const [score,setScore] = useState([]);
    const [currentBowler,setCurrentBowler] = useState({});
    const [currentOver,setCurrentOver] = useState([]);
    const [currentOverLegalDelivery,setCurrentOverLegalDelivery] = useState(0);

    const [currentBatsman,setCurrentBatsman] = useState({});
    const [currentBatsmanRun,setCurrentBatsmanRun] = useState([]);


    const player = {
        name: currentBatsman.name,
        score: [
            currentBatsmanRun
        ]
    };

    const playerBowler = {
        ...currentBowler,
        score: [currentOver]
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

    const endOfInnings = () => {
        setBattingTeam(bowlingTeam);
        setBowlingTeam(battingTeam);
    }

    const updateBowler = (score) =>{
        //Check if its a legal delivery
        const legalDeliveries = ['0','1','2','3','4','w'];
        const isLegal = legalDeliveries.includes(score);
        //if its lagal then set lagal delivery
        isLegal && setCurrentOverLegalDelivery(currentOverLegalDelivery+1);

        //Update current Over
        setCurrentOver([...currentOver,score]);
        
    }

    const updateBatsman = (score,extra) => {
        //Check if its a extra run
        //if extra then ignore it
        if(extra) return;
        
        setCurrentBatsmanRun([...currentBatsmanRun,score]);
        score == 'w' && batsmanPopup();
    }

    const updateScore = (newScore) => {
        setScore([...score,newScore])
    }

    const handleUpdate = (event,extra = false) => {
        if(currentOverLegalDelivery >= 6)return bowlerPopup();

        const newScore = event.currentTarget.getAttribute('data-score');

        updateBowler(newScore);
        updateBatsman(newScore,extra);
        updateScore(newScore);

        console.log('delivery: ',currentOverLegalDelivery,'over:',currentOver)
    }

    useEffect(()=>{
        bowlerPopup();
        setNextPopup(true);
    },[]);

    const batsmanPopup = ()=>{
        setPopup({title: 'Select Batsman',status: true, batsman: true});
        setPopupList(battingTeam.players);
    }

    const bowlerPopup = ()=>{
        setPopup({title: 'Select Bowler',status: true, batsman: false});
        setPopupList(bowlingTeam.players);
    }

    const resetCurrentBowler = (obj) => {
        setCurrentBowler(obj);
        setCurrentOver([]);
        setCurrentOverLegalDelivery(0);
    }

    const resetCurrentBatsman = (obj) => {
        setCurrentBatsman(obj);
        setCurrentBatsmanRun([]);
    }

    const next = (obj,batsman = false) => {
        batsman ? resetCurrentBatsman(obj) : resetCurrentBowler(obj);
        setPopup({...popup,status: false})
        if(nextPopup){
            setNextPopup(false);
            batsmanPopup();
        }
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
                <Box flexGrow={1} >
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="column">
                            <Box component="span" textAlign="center">Extra</Box>
                            <ScoreUpdater handler={(e)=>{handleUpdate(e,true)}} updates={scoreUpdatesExtra} />
                            <Button onClick={endOfInnings}>End of Innings</Button>
                        </Box>
                    </Box>
                </Box>
                <Box flexGrow={1}></Box>
                <PlayerScore player={playerBowler}/>
                <PlayingEleven team={teamTwo} />
            </Box>
            <Box display="flex" mt={4} >
                <span>Highlight:&nbsp;</span>
                <Highlight score={score}/>
            </Box>
            <Box className={classes.scoreUpdater}>
                <ScoreUpdater updates={scoreUpdates} handler={handleUpdate} size="large" />
            </Box>
            <Popup popup={popup} players={popupList} next={next}/>
        </div>
    )
}

export default Match;
