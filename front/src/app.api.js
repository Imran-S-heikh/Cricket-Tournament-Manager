import Axios from "axios";

export function getUser() {
    return Axios({
        method: 'POST',
        url: 'api/v1/players/authenticate'
    })
}