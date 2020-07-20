import Axios from "axios";

export function getTournaments() {
    return Axios({
        method: 'GET',
        url: 'api/v1/tournaments'
    })
}

export function getTournament(id){
    return Axios({
        method: 'GET',
        url: `api/v1/tournaments/${id}`
    }).then(res=>{
        return res.data.tournament
    }).catch(err=>{
        return null
    })
}