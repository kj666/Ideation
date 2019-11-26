import { store } from '../store.js';
import constants from '../constants.js';
import { controller } from '../services/api-controller.js';

export const searchConstants = {
    GET_RANDOM_WORD : 'RANDOM_WORD',
    ADD_WORD: 'ADD_WORD',
    REMOVE_WORD: 'REMOVE_WORD',
    GET_LINKS: 'GET_LINKS',
    FAVORITE_LINK: 'FAVORITE_LINK'
}

const getRandomWords = () => {
    return (dispatch) =>{
        controller.sendHttpRequest('GET', constants.RANDOM_URL)
        .then(responseData => {
            console.log(responseData);
            dispatch(requestRandomWords(responseData));
          });
    }
}

const requestRandomWords = (words) =>{
    return {type: searchConstants.GET_RANDOM_WORD, words }
}

const addWord = (word) =>{ return { type: searchConstants.ADD_WORD, word } }

export const searchActions = {
    getRandomWords,
    addWord
}