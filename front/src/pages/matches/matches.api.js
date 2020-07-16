import Axios from "axios";

export function getAllMatches() {
    Axios.get('api/v1/matches').then((res)=>{
        console.log(res)
    })
}