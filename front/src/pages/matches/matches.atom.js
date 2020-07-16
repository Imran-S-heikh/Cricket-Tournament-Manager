import { atom } from "recoil";
import { ALL_MATCHES_STATE } from './matches.key';


export const allMatchesState = atom({
    key: ALL_MATCHES_STATE,
    default: []
})