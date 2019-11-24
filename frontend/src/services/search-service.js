import constants from '../constants.js';
import { setTouchAction } from '@polymer/polymer/lib/utils/gestures';

export const searchService = {
    getRandomWords
}

async function getRandomWords(){
    return fetch(constants.RANDOM_URL,{
        method: 'get',
        headers: {
            "Content-type":"application/json-patch+json"
        }
    })
}