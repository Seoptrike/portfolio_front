import axios from './axiosInstance';

export const insertWorkExp = (WorkExp) => {
    return axios.post('/api/career/work',WorkExp)
};
    
