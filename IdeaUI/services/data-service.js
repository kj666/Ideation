import constants from '../constants.js';

export const DataService = {
    getResearches
}

const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_FAILURE = "GET_USER_FAILURE";
const GET_USER_FAILURE_HANDLED = "GET_USER_FAILURE_HANDLED";

const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    }
}

const getUserSuccess = (userInfo) => {
    return {
        type: GET_USER_SUCCESS,
        user: userInfo.user
    }
}

const getUserError = (error) => {
    return {
        error
    }
}

const getUserErrorHandled = () => {
    return {
        type: GET_USER_FAILURE_HANDLED
    }
}

async function getResearch() {
    var researchBody = {}
    return fetch(constants.RESEARCH_API_URL, {
        method: 'get',
        headers: {
            "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify(researchBody)
    })

    const getResearches = () => {
        return (dispatch) => {
            dispatch(getUserRequest());
    
            var resStatus = 0;
            var errorMessage = "";
    
            getResearch()
                .then(res => {
                    resStatus = res.status
                    return res.json();
                })
                .then(jsonRes => {
                    errorMessage = handleResponse(jsonRes, resStatus);
                    if (errorMessage != "") {
                        throw new Error(errorMessage);
                    }
                    handleGetUserSuccess(jsonRes);
                }).catch(error => {
                    console.log(error);
                    if (errorMessage == "" || !errorMessage) {
                        store.dispatch(getUserError(constants.DEFAULT_NETWORK_ERROR_MESSAGE));
                    } else {
                        store.dispatch(getUserError(error.message));
                    }
                });
    
        }
    }
    //return fetch(constants.USER_API_URL + "confirmEmail?email=" + email + "&token=" + token);
}