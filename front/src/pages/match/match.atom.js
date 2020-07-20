import { atom } from "recoil";
import { TOTAL_SCORE_STATE, SCORE_STATE, TEAM_ONE_STATE, TEAM_TWO_STATE,POPUP_OPEN_STATE, CURRENT_BATTING_TEAM_STATE, 
POPUP_STATE,
CURRENT_BATSMAN_STATE,
CURRENT_BOWLER_STATE,
CURRENT_BOWLING_TEAM_STATE,
OVERS_STATE} from "./match.keys";

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

export const oversState = atom({
    key: OVERS_STATE,
    default: 0
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
        name: '',
        captain: '',
        status: '',
        playingEleven: []
    }
})

export const teamOneState = atom({
    key: TEAM_ONE_STATE,
    default: {
        name: '',
        captain: '',
        status: '',
        playingEleven: []
    }
})



