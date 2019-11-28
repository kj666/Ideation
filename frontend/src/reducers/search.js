import { searchConstants } from '../actions/search.js';

const INITIAL_STATE = {
    words: [],
    links: {"links": [
        {
            "link": "https://www.researchgate.net/publication/225776573_Descriptions_of_the_larva_and_pupa_of_the_short_palped_crane_fly_Rhipidia_uniseriata_Schiner_1864_Diptera_Limoniidae",
            "title": "Descriptions of the larva and pupa of the short palped crane fly ...",
            "snippet": "Descriptions of the larva and pupa of the short palped crane fly Rhipidia ... living \nin saturated rotten wood, confined to fallen timber and coarse wooden debris in ..."
        },
        {
            "link": "http://nora.nerc.ac.uk/7499/1/Long-palpedCraneflies.pdf",
            "title": "Provisional atlas of the long-palped craneflies (Diptera: Tipulinae) of ...",
            "snippet": "continuity of large dead timber are now rare in the British countryside. The site \nwith the largest recorded number of species of Tipulidae is. Wisley Common in ..."
        }],
        "startIndex":0
},
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
            },
            {
                "link": "http://nora.nerc.ac.uk/7499/1/Long-palpedCraneflies.pdf",
                "title": "Provisional atlas of the long-palped craneflies (Diptera: Tipulinae) of ...",
                "snippet": "continuity of large dead timber are now rare in the British countryside. The site \nwith the largest recorded number of species of Tipulidae is. Wisley Common in ..."
            }
        ],
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
    }]
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
                   links: [...state.links, action.links],
                   haveLinks: true
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