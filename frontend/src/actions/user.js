import { store } from "../store";
import { controller } from "../services/api-controller"
import { navigateTo}  from "./app";
import constants from '../constants.js';

export const userConstants= {
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',

    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",

    LOGOUT: "LOGOUT"
}

const request = (user) =>{ return { type: userConstants.LOGIN_REQUEST, user } }
const success = (user) => { return { type: userConstants.LOGIN_SUCCESS, user} }
const logout = () => { return { type: userConstants.LOGOUT} }
const failure = (error) => { return { type: userConstants.LOGIN_FAILURE, error} }


const login = (_email, _password) =>{
    return (dispatch) =>{
        controller.sendHttpRequest('POST', constants.LOGIN_USER_URL,{
            email: _email,
            password: _password
          }).then(responseData =>{
            localStorage.setItem('user',JSON.stringify(responseData.email));
            console.log(responseData);
            if(responseData.id == null){
                dispatch(failure(responseData));
            }
            else{
            dispatch(success(responseData));
            }
          }).catch(err => {

          });
    }
}

export const userActions ={
    login,
    logout
}

