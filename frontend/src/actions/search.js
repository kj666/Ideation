import { store } from '../store.js';
import constants from '../constants.js';
import { controller } from '../services/api-controller.js';

export const searchConstants = {
    GET_RANDOM_WORD : 'RANDOM_WORD',
    ADD_WORD: 'ADD_WORD',
    REMOVE_WORD: 'REMOVE_WORD',
    GET_LINKS: 'GET_LINKS',
    SAVE_RESEARCH: 'SAVE_RESEARCH',

    FAVORITE_LINK: 'FAVORITE_LINK',
    RESEARCH_LINK: 'RESEARCH_LINK',
    RESET_RESEARCH: 'RESET_RESEARCH'
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

const getSearchLinks = (wordList) => {
    return (dispatch) =>{
        controller.sendHttpRequest('POST', constants.SEARCH_URL,{
            query: wordList,
            startIndex: "0"
        }).then(responseData =>{
            console.log(responseData);
            dispatch(requestLinks(responseData));
        });
    }
}

const postResearch =(_username,_research) =>{
    return (dispatch) =>{
        controller.sendHttpRequest('POST', constants.RESEARCH_USER_URL+"/"+_username, _research)
        .then(responseData =>{
            console.log(responseData);
            dispatch(saveResearch(responseData));
          }).catch(err => {
            console.log(err, err.data);
          });
    }
}

const requestRandomWords = (words) =>{
    return {type: searchConstants.GET_RANDOM_WORD, words }
}

const addWord = (word) =>{ return { type: searchConstants.ADD_WORD, word } }

const requestLinks = (request) =>{ return { type: searchConstants.GET_LINKS, request } }

const saveResearch =(research) =>{ return { type: searchConstants.SAVE_RESEARCH, research} }

export const searchActions = {
    getRandomWords,
    addWord, 
    getSearchLinks,
    postResearch
}