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
const getRandomWords = () => {
  sendHttpRequest('GET', constants.RANDOM_URL).then(responseData => {
    randomWords = responseData;
    console.log(responseData);
  });
};
  const getResearch = (username) => {
    sendHttpRequest('GET', constants.RESEARCH_USER_URL+'/'+_username)
    .then(responseData => {
      console.log(responseData);
    });
  };
  
  const postUser = (_email, _username, _name, _password ) => {
    sendHttpRequest('POST', constants.POST_USER_URL,{
      email: _email,
      username: _username,
      fullname: _name,
      password: _password
    }).then(responseData =>{
      console.log(responseData);
    }).catch(err => {
      console.log(err, err.data);
    });
  };

  const loginUser = (_email, _password) =>{
    sendHttpRequest('POST', constants.LOGIN_USER_URL,{
      email: _email,
      password: _password
    }).then(responseData =>{
      localStorage.setItem('userID',responseData.id);
      console.log(responseData);
    }).catch(err => {
      console.log(err, err.data);
    });
  };

  const postResearch =  (_research) =>{
    sendHttpRequest('POST', constants.RESEARCH_USER_URL+'/'+_research.username, _research).then(responseData =>{
      console.log(responseData);
    }).catch(err => {
      console.log(err, err.data);
    });
  };

export const controller ={
    sendHttpRequest,
    getResearch,
    postUser,
    loginUser,
    postResearch
}