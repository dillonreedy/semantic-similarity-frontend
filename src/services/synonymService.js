import axios from 'axios';

const baseURL = 'http://localhost:3001/';

async function getQuestion(params)
{
    const accessURL = `${baseURL}getQuestion`;

    let res = await axios.get(accessURL, { params });
    return res.data;
}

export default {
    getQuestion
};