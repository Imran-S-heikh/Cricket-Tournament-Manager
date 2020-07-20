import Axios from "axios";

export function getMatch(id) {
    return Axios({
        method: 'GET',
        url: `/api/v1/matches/${id}`
    }).then(res=>{
        console.log(res)
        return res.data.match
    }).catch(err=>{
        console.log(err)
    })
}