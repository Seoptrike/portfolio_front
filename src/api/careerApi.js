import axios from './axiosInstance';

export const insertWorkExp = (WorkExp) => {
    return axios.post('/api/career/work',WorkExp)
};

export const insertEduHistory = (EduHistory) => {
    return axios.post('/api/career/edu',EduHistory)
};

// export const insertStack = (stack) => {
//     return axios.post()
// }
