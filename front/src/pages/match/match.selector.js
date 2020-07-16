import { selector } from "recoil";
import { INITIAL_POPUPS_STATE } from "./match.keys";
import { teamOneState,teamTwoState,currentBattingTeamState } from "./match.atom";

export const initialPopupsState = selector({
    key: INITIAL_POPUPS_STATE,
    get: ({get})=>{
        const teamOne = get(teamOneState);
        const teamTwo = get(teamTwoState);
        const battingTeam = get(currentBattingTeamState)

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
})