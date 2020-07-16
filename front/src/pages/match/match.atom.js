import { atom } from "recoil";
import { TOTAL_SCORE_STATE, SCORE_STATE, TEAM_ONE_STATE, TEAM_TWO_STATE,POPUP_OPEN_STATE, CURRENT_BATTING_TEAM_STATE, 
POPUP_STATE,
CURRENT_BATSMAN_STATE,
CURRENT_BOWLER_STATE,
CURRENT_BOWLING_TEAM_STATE} from "./match.keys";

export const totalScoreState = atom({
    key: TOTAL_SCORE_STATE,
    default: { run: 0, wicket: 0 }
});

export const currentBattingTeamState = atom({
    key: CURRENT_BATTING_TEAM_STATE,
    default: 'teamOne'
});

export const currentBowlingTeamState = atom({
    key: CURRENT_BOWLING_TEAM_STATE,
    default: 'teamTwo'
});

export const popupState = atom({
    key: POPUP_STATE,
    default: {
        title: '',
        players: []
    }
});

export const scoreState = atom({
    key: SCORE_STATE,
    default: []
});

export const popupOpenState = atom({
    key: POPUP_OPEN_STATE,
    default: false
});


export const currentBatsmanState = atom({
    key: CURRENT_BATSMAN_STATE,
    default: {
        striker: {
            name: '',
            score: []
        },
        nonStriker: {
            name: '',
            score: []
        }
    }
});


export const currentBowlerState = atom({
    key: CURRENT_BOWLER_STATE,
    default: {
        name: '',
        score: [],
        legalDeliviries: 0
    }
});

export const teamTwoState = atom({
    key: TEAM_TWO_STATE,
    default: {
        name: 'India',
        captain: 'Koli The Wall',
        status: 'bowling',
        players: [
            { name: 'Pathan', id: '565' },
            { name: 'Kohli', id: '57667' },
            { name: 'MS Dhoni', id: '47546' },
            { name: 'hardik Pandiya', id: '45656' },
            { name: 'Vhuben Kumar', id: '545667' },
            { name: 'Rohit Sharma', id: '4565' }
        ]
    }
})

export const teamOneState = atom({
    key: TEAM_ONE_STATE,
    default: {
        name: 'Bangladesh',
        captain: 'John Cina',
        status: 'batting',
        players: [
            { name: 'Tamim Iqbal', id: '9347' },
            { name: 'Shakib Al Hansan', id: '3434' },
            { name: 'Saif The Boss', id: '4434' },
            { name: 'Liton The Perfect Timer', id: '5675' },
            { name: 'Soumya The Huge', id: '567' },
            { name: 'Musi The Dependable', id: '3478' }
        ]
    }
})



