import constants from '../constants.js';

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

let randomWords = [];

  const getRandomWords = () => {
    sendHttpRequest('GET', constants.RANDOM_URL).then(responseData => {
      randomWords = responseData;
      console.log(responseData);
    });
  };


  const getResearch = () => {
    sendHttpRequest('GET', constants.RESEARCH_URL).then(responseData => {
      console.log(responseData);
    });
  };

export const controller ={
    sendHttpRequest,
    getRandomWords,
    getResearch
}