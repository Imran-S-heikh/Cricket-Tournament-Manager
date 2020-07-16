import Axios from "axios";

export function signupRequest(data) {
    return Axios({
        method: 'POST',
        url: 'api/v1/players/signup',
        data
    })
}