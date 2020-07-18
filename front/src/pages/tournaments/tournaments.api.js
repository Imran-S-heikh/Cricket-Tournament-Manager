import Axios from "axios";

export function getTournaments() {
    return Axios({
        method: 'GET',
        url: 'api/v1/tournaments'
    })
}