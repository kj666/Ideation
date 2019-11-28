
const DEFAULT_NETWORK_ERROR_MESSAGE = 'A network error has occurred';

// const API_URL = 'http://localhost:5000/idea';
// const API_URL = 'http://ec2-54-161-141-29.compute-1.amazonaws.com'
const API_URL = 'http://54.161.141.29:1000/idea';
const RESEARCH_URL = `${API_URL}/research`;
const RESEARCH_USER_URL = `${API_URL}/research/user`;
const FAVORITE_USER_URL = `${API_URL}/favorite/user`;
const POST_USER_URL = `${API_URL}/user`;
const LOGIN_USER_URL = `${API_URL}/user/login`;


const SEARCH_URL = `${API_URL}/search-keywords`;

const SEARCH_API_URL = 'http://3.87.182.8:50000';
const RESULT_URL = `${SEARCH_API_URL}/search-keywords`;

const RANDOM_URL = `${API_URL}/words/random`;
// const RANDOM_URL = `https://87938f90-8e2c-4c73-a8c8-b6ca7478ad85.mock.pstmn.io/workAPI`;
// const RANDOM_URL = 'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=6&api_key=hcjtmdkyfyp7wb7znn47m2o6ezs8d1e82hvf7xkv87hf7bb4h';

const constants ={
    RANDOM_URL,
    RESEARCH_URL,
    RESEARCH_USER_URL,
    FAVORITE_USER_URL,
    POST_USER_URL,
    LOGIN_USER_URL,
    API_URL,
    SEARCH_API_URL,
    SEARCH_URL,
    RESULT_URL
}
export default constants;
