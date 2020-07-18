import { ALL_TOURNAMENTS_STATE } from "./tournaments.keys";
import { atom } from "recoil";

export const allTournamentsState = atom({
    key: ALL_TOURNAMENTS_STATE,
    default: []
})