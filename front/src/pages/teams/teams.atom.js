import { atom } from "recoil";
import { ALL_TEAM_STATE } from "./teams.keys";

export const allTeamState = atom({
    key: ALL_TEAM_STATE,
    default: []
})