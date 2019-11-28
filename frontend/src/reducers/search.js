import { searchConstants } from '../actions/search.js';

const INITIAL_STATE = {
    words: [],
    links: [
        {
            "link": "https://en.wikipedia.org/wiki/Elon_Musk",
            "title": "Elon title",
            "snippet": "Example Description"
        },
        {
            "link": "https://en.wikipedia.org/wiki/Bill_Gates",
            "title": "Example title",
            "snippet": "Example Description"
        }
    ],
    nextIndex: "0",
    haveLinks: true,
    researches: [{
        "id": "id",
        "user_id": "userid",
        "research_name": "Research Name",
        "keywords": [
            "word1",
            "word2",
            "word3"
        ],
        "results": [
            {
            "link": "https://example.com",
            "title": "Example title",
            "snippet": "Example Description"
            }],
        "timestamp": "2019-11-27T04:44:42.364Z"
    }],
    favoriteLinks: [{
        "id": "id",
        "user_id": "userid",
        "results": {
            "link": "https://example.com",
            "title": "Example title",
            "snippet": "Example Description"
        },
        "timestamp": "2019-11-27T05:53:33.368Z"
    }],
    likedLinks: [{"link": "https://example.com",
    "title": "Example title",
    "snippet": "Example Description"},
    {"link": "https://example.com",
    "title": "Example title",
    "snippet": "Example Description"}],
    sendFavorite:{
        "result":
        {
            "link": "https://example.com",
            "title": "Example title",
            "snippet": "Example Description"
        }
    }
};

const search = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case searchConstants.GET_RANDOM_WORD:
            return{
                ...state,
                words: action.words
            };
        case searchConstants.ADD_WORD:
            return{
                ...state,
                words: [...state.words, action.word],
            };
        case searchConstants.GET_LINKS:
                return{
                    ...state, 
                    links: action.searchLinks.links,
                    nextIndex: action.searchLinks.nextPage,
                    haveLinks: true
                };
        case searchConstants.NO_LINKS:
            return{
                ...state,
                links: [
                    {
                        "link": "https://example.com",
                        "title": "Example title",
                        "snippet": "Example Description"
                    }],
                startIndex: 0,
                haveLinks: false
            };
        case searchConstants.SAVE_RESEARCH:
            return{
                ...state,
                research: action.research
            };
        case searchConstants.FAVORITE_LINK:
            return{
                ...state,
                favoriteLinks: action.favorites
            }; 
        case searchConstants.RESEARCH_LINK:
            return{
                ...state,
                researches: action.researches
            };    
        case searchConstants.RESET_RESEARCH:
        return{
            ...state,
            researchLinks: []
        };   
        default:
            return {
            ...state,
            type: "default"
        }
    }
}

export default search;