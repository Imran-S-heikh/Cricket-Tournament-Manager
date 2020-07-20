import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar, Avatar, Zoom } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popupOpenState, popupState, teamOneState, teamTwoState, currentBattingTeamState } from '../pages/match/match.atom';
import { initialPopupsState } from '../pages/match/match.selector';


function Popup({ next }) {
    const [lastBowler, setLastBowler] = useState(null);
    const [outBatsman, setOutBatsman] = useState([]);
    const [nextPopup, setNextPopup] = useState(true);
    const [popup, setPopup] = useRecoilState(popupState);
    const [poroxyPopups, setPoroxyPopups] = useState(null);
    const [popupOpen, setPopupOpen] = useRecoilState(popupOpenState);
    const initialPopups = useRecoilValue(initialPopupsState);
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
        callPopup(initialPopups);
    }, [initialPopups])

    const handleClick = ({ currentTarget: { id, textContent } }) => {
        checkBatsman(popup.type) ? setOutBatsman([...outBatsman, id]) : setLastBowler(id);
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
                    const disabled = checkBatsman(popup.type) ? outBatsman.includes(player._id) : lastBowler === player._id;

                    return (
                        <ListItem key={player._id} id={player._id} button disabled={disabled} onClick={(event) => handleClick(event, player._id)}>
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
