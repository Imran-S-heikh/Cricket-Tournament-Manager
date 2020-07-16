import { atom } from "recoil";
import { CURRENT_USER_STATE } from "./types";

export const currentUserState = atom({
    key: CURRENT_USER_STATE,
    default: null
})