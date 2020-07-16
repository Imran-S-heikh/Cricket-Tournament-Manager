import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popupOpenState, popupState,teamOneState,teamTwoState,currentBattingTeamState } from '../pages/match/match.atom';


function Popup({ next }) {
    const [lastBowler, setLastBowler] = useState(null);
    const [outBatsman, setOutBatsman] = useState([]);
    const [nextPopup, setNextPopup] = useState(true);
    const [popup, setPopup] = useRecoilState(popupState);
    const [poroxyPopups, setPoroxyPopups] = useState(null);
    const [popupOpen, setPopupOpen] = useRecoilState(popupOpenState);
    const teamOne = useRecoilValue(teamOneState);
    const teamTwo = useRecoilValue(teamTwoState);
    const battingTeam = useRecoilValue(currentBattingTeamState)

    const callPopup = (popups) => {
        const key = Object.keys(popups)[0];
        setPopup(popups[key]);
        setPopupOpen(true);
        setPoroxyPopups(() => {
            const newObj = { ...popups }
            delete newObj[key];
            return newObj
        });
    }

    useEffect(() => {
        callPopup(initialPopups());
    }, [])

    const initialPopups = ()=>{
        return {
            bowler: {
                title: 'Select a Bowler',
                players: battingTeam === 'teamOne' ? teamTwo['players']  : teamOne['players'],
                type: 'bowler'
            },
            striker: {
                title: 'Select a Striker Batsman',
                players: battingTeam === 'teamOne' ? teamOne['players'] : teamTwo['players'],
                type: 'striker' 
            },
            nonStriker: {
                title: 'Select a Non-Striker Batsman',
                players: battingTeam === 'teamOne' ? teamOne['players'] : teamTwo['players'],
                type: 'non-striker' 
            }
        }
    }

    const handleClick = ({ currentTarget: { id, textContent } }) => {
        checkBatsman(popup.type) ? setOutBatsman([...outBatsman, id]) : setLastBowler(id);
        console.log(next)
        next({ name: textContent, id }, popup.type);
        if (nextPopup && Object.keys(poroxyPopups).length > 0) {
            callPopup(poroxyPopups);
        } else {
            setNextPopup(false);
            setPopupOpen(false);
        }
    }

    const checkBatsman = (type) => {
        return type === 'striker' || type === 'non-striker'
    }

    return (
        <Dialog open={popupOpen}>
            <DialogTitle>{popup.title}</DialogTitle>
            <List>
                {popup.players.map((player) => {
                    const disabled = checkBatsman(popup.type) ? outBatsman.includes(player.id) : lastBowler === player.id;

                    return (
                        <ListItem key={player.id} id={player.id} button disabled={disabled} onClick={(event) => handleClick(event, player.id)}>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText primary={player.name} />
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    )
}

export default Popup;
