import {searchActions} from '../actions/search.js';

const INITIAL_STATE = {
    isFetching: false,
    error: '',
    errorHandled: true,
    randomWords: []
};

const randomWords = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case searchActions.GET_RANDOM_WORD_REQUEST:
            return{
                ...state,
                type: "get_random_word_request",
                isFetching: true
            };
        case searchActions.GET_RANDOM_WORD_SUCCESS:
            return{
                ...state,
                type: "get_random_word_success",
                isFetching: false,
                randomWords: action.randomWords,
                error: ''
            };
            case searchActions.GET_RANDOM_WORD_FAILURE:
                    return {
                        ...state,
                        type: "get_random_word_failure",
                        isFetching: false,
                        error: action.error,
                        errorHandled: false
                    };
                case searchActions.GET_RANDOM_WORD_HANDLED:
                    return {
                        ...state,
                        type: "get_random_word_failure",
                        errorHandled: true
                    };
                default:
                    return {
                    ...state,
                    type: "default"
                }
    }
}

export default randomWords;