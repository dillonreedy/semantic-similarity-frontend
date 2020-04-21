import axios from 'axios';

const baseURL = 'https://api-dot-pipeline-semantic-274917.uc.r.appspot.com/';

async function getQuestion(params)
{
    const accessURL = `${baseURL}getQuestion`;

    let res = await axios.get(accessURL, { params });
    return res.data;
}

export default {
    getQuestion
};