import Axios from "axios";

export function requestLogin(data) {
    return Axios({
        method: "POST",
        url: 'api/v1/players/login',
        data
    })
}