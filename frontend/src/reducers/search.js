import { searchConstants } from '../actions/search.js';

const INITIAL_STATE = {
    words: [],
    links: [],
    haveLinks: false
};

const search = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case searchConstants.GET_RANDOM_WORD:
            return{
                ...state,
                words: action.words,
                links: []
            };
        case searchConstants.ADD_WORD:
            return{
                ...state,
                words: [...state.words, action.word],
            };
        case searchConstants.GET_LINKS:
                return{
                    ...state,
                   links: action,
                   haveLinks: true
                };            
        default:
            return {
            ...state,
            type: "default"
        }
    }
}

export default search;