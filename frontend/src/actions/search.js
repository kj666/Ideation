import { store } from '../store.js';
import constants from '../constants.js';
import { controller } from '../services/api-controller.js';

export const searchConstants = {
    GET_RANDOM_WORD : 'RANDOM_WORD',
    ADD_WORD: 'ADD_WORD',
    REMOVE_WORD: 'REMOVE_WORD',
    GET_LINKS: 'GET_LINKS',
    NO_LINKS: 'NO_LINKS',
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

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then(response => {
      if (response.status >= 400) {
        // !response.ok
        return response.json().then(errResData => {
          const error = new Error('Something went wrong!');
          error.data = errResData;
          throw error;
        });
      }
      return response.json();
    });
  };

const getSearchLinks = (wordList, index) => {
    return (dispatch) =>{
        sendHttpRequest('GET', constants.SEARCH_URL,{
            query: wordList,
            startIndex: index
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
const postFavorite =(_username,_favorite) =>{
    controller.sendHttpRequest('POST', constants.FAVORITE_USER_URL+"/"+_username, _favorite)
    .then(responseData =>{
        console.log(responseData);
        }).catch(err => {
        console.log(err, err.data);
        });
}

const getAllFavorites = (_username) =>{
    return (dispatch) => {
        controller.sendHttpRequest('GET', constants.FAVORITE_USER_URL+"/"+_username)
        .then(responseData =>{
            console.log(responseData);
            dispatch(requestFavorites(responseData));
        });
    }
}

const getAllResearches = (_username) => {
    return (dispatch) =>{
        controller.sendHttpRequest('GET', constants.RESEARCH_USER_URL+"/"+_username)
        .then(responseData =>{
            console.log(responseData);
            dispatch(requestResearches(responseData));
        });
    }
}

const requestRandomWords = (words) =>{ return {type: searchConstants.GET_RANDOM_WORD, words } }

const addWord = (word) =>{ return { type: searchConstants.ADD_WORD, word } }

const requestLinks = (searchLinks) =>{ return { type: searchConstants.GET_LINKS, searchLinks } }

const saveResearch =(research) =>{ return { type: searchConstants.SAVE_RESEARCH, research} }

const requestFavorites = (favorites) => { return { type: searchConstants.FAVORITE_LINK, favorites} }

const requestResearches = (researches) => { return { type: searchConstants.RESEARCH_LINK, researches} }

export const searchActions = {
    getRandomWords,
    addWord, 
    getSearchLinks,
    postResearch,
    postFavorite,
    getAllFavorites,
    getAllResearches
}