import axios from 'axios';

const baseURL = 'https://semantic-similarity-backend-s2zuhmr2fa-uc.a.run.app/';

async function getQuestion(params)
{
    const accessURL = `${baseURL}getQuestion`;

    let res = await axios.get(accessURL, { params });
    return res.data;
}

export default {
    getQuestion
};