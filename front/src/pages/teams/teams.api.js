import Axios from "axios";

export function getAllTeams(data) {
    return Axios({
        method: 'GET',
        url: 'api/v1/teams'
    })
}