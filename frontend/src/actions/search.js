import { store } from '../store.js';
import constants from '../constants.js';
import { searchService } from '../services/search-service.js';

const GET_RANDOM_WORD_REQUEST = "GET_RANDOM_WORD_REQUEST";
const GET_RANDOM_WORD_SUCCESS = "GET_RANDOM_WORD_SUCCESS";
const GET_RANDOM_WORD_FAILURE = "GET_RANDOM_WORD_FAILURE";
const GET_RANDOM_WORD_FAILURE_HANDLED = "GET_RANDOM_WORD_FAILURE_HANDLED";

const getRandomWordRequest = () =>{
    return {
        type: GET_RANDOM_WORD_REQUEST
    }
}

const getRandomWordSuccess = (randomWords) =>{
    return {
        type: GET_RANDOM_WORD_SUCCESS,
        words: randomWords
    }
}

const getRandomWordError = (error) =>{
    return {
        type: GET_RANDOM_WORD_FAILURE,
        error
    }
}

const getRandomWordErrorHandled = (error) =>{
    return {
        type: GET_RANDOM_WORD_FAILURE_HANDLED
    }
}

const handleRespone = (response, status) => {
    var errorMessage = "";
    if (status == 401 || status == 400) {
        errorMessage = response.error;
    } else if (status != 200) {
        errorMessage = constants.DEFAULT_NETWORK_ERROR_MESSAGE;
    }
    return errorMessage;
}

const handleError = () => {
    return (dispatch) =>{
        return setTimeout(()=>{
            dispatch(getRandomWordErrorHandled());
        }, 3000);
    }
}

const getRandomWords = () =>{
    return (dispatch) =>{
        dispatch(getRandomWordRequest());

        var resStatus = 0;
        var errorMessage = "";

        searchService.getRandomWords()
        .then(res=>{
            resStatus = res.status
            return res.json();
        })
        .then(jsonRes => {
            errorMessage = handleRespone(json, resStatus);
            if(errorMessage != ""){
                throw new Error(errorMessage);
            }
            handleGetRandomWordSuccess(jsonRes);
        })
        .catch(error =>{
            if(errorMessage == "" || !errorMessage){
                dispatch(getRandomWordError(constants.DEFAULT_NETWORK_ERROR_MESSAGE));
            } else{
                dispatch(getRandomWordError(error.message));
            }
        });
    }
}

const handleGetRandomWordSuccess = (randomWord) => {
    store.dispatch(getRandomWordSuccess(randomWord));
}

export const searchActions = {
    GET_RANDOM_WORD_FAILURE,
    GET_RANDOM_WORD_FAILURE_HANDLED,
    GET_RANDOM_WORD_REQUEST,
    GET_RANDOM_WORD_SUCCESS,
    getRandomWordSuccess
}
export const searchThunks = {
    handleError,
    getRandomWords
}