import Axios from "axios";

export function getAllTeams(data) {
    return Axios({
        method: 'GET',
        url: 'api/v1/teams'
    })
}

export function getTeam(id){
    return Axios({
        method: 'GET',
        url: `api/v1/teams/${id}`
    }).then(res=>{
        return res.data.team
    }).catch(err=>{
        return null
    })
}