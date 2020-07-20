import React from 'react';
import { Button } from '@material-ui/core';
import { v4 as uniqId } from 'uuid';
import { useRecoilState } from 'recoil';
import { totalScoreState,teamOneState,teamTwoState,currentBattingTeamState,scoreState, currentBatsmanState, popupState, popupOpenState, currentBowlerState, currentBowlingTeamState, oversState } from '../pages/match/match.atom';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

function ScoreUpdater({updates,size,extra = false}) {

    const [totalScore,setTotalScore] = useRecoilState(totalScoreState);
    const [score,setScore] = useRecoilState(scoreState);
    const [currentBatsman,setCurrentBatsman] = useRecoilState(currentBatsmanState);
    const setPopup = useSetRecoilState(popupState);
    const setPopupOpen = useSetRecoilState(popupOpenState);
    const [currentBowler,setCurrentBowler] = useRecoilState(currentBowlerState);
    const teamOne = useRecoilValue(teamOneState);
    const teamTwo = useRecoilValue(teamTwoState);
    const battingTeam = useRecoilValue(currentBattingTeamState);
    const bowlingTeam = useRecoilValue(currentBowlingTeamState);
    const [overs,setOvers] = useRecoilState(oversState)
    const teams = {teamOne,teamTwo};

    
    const updateScore = (newScore) => {
        const singleRun = ['wd','nb']
        if (newScore !== 'w') {
            newScore = singleRun.includes(newScore) ? '1' : newScore;
            setTotalScore({...totalScore,run: totalScore.run+Number(newScore)})
        }
        setScore([...score, newScore])
    }


     const exchangeBatsman = (newScore) => {
        setCurrentBatsman({
            striker: currentBatsman.nonStriker,
            nonStriker: {
                ...currentBatsman.striker,
                score: [
                    ...currentBatsman.striker.score,
                    newScore
                ]
            }
        })
    }

    const updateBatsman = (newScore,extra) => {
        const playerExchangeEvents = ['1', '3']
        //Check if its a extra run
        //if extra then ignore it
        if (extra) return;

       

        setCurrentBatsman((oldState)=>{
            const oldStriker = oldState.striker
            const striker = {
                ...oldStriker,
                score: [...oldStriker.score,newScore]
            }
            return {...oldState,striker}
        });
        if (newScore === 'w') {
            setTotalScore({...totalScore,wicket: totalScore.wicket + 1});
            setPopup({title: 'Select a Batsman',players: teams[battingTeam].playingEleven,type: 'striker'})
            setPopupOpen(true);
        }

        // exchange batsman if single
        if (playerExchangeEvents.includes(newScore) && currentBowler.legalDeliviries + 1 >= 6) {
        } else if (playerExchangeEvents.includes(newScore) || currentBowler.legalDeliviries + 1 >= 6) {
            exchangeBatsman(newScore);
        }
    }

    const updateBowler = (newScore) => {
        if (currentBowler.legalDeliviries + 1 >= 6) {
            setOvers(overs+1);
            setPopup({title: 'Select a Bowler',players: teams[bowlingTeam].playingEleven,type: 'bowler'})
            setPopupOpen(true);
        };
        //Check if its a legal delivery
        const legalDeliveries = ['0', '1', '2', '3', '4', 'w'];
        const isLegal = legalDeliveries.includes(newScore);
        //if its lagal then set lagal delivery
        setCurrentBowler((oldState)=>{
            const {score,legalDeliviries} = oldState;
            const newState = {
                ...oldState,
                score: [...score,newScore],
                legalDeliviries: isLegal && !extra ? legalDeliviries+1 : legalDeliviries
            }

            return newState
        });
    }

    const handleUpdate = (event) => {
        const newScore = event.currentTarget.getAttribute('data-score');

        updateBowler(newScore,extra);
        updateBatsman(newScore,extra);
        updateScore(newScore);
    }
    return (
        <>
        {updates.map(el=>
            <Button key={uniqId()} data-score={el.type} variant="outlined" size={size} onClick={handleUpdate}>
                {el.value}
            </Button>)}
        </>
    )
}

export default ScoreUpdater
