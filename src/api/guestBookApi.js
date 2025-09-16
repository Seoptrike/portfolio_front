import axios from "./axiosInstance";

export const fetchGuestBookList = (username) =>{
        return axios.get(`/api/guest/${username}`)
}

export const fetchCombinedGuestBookList = (username) => {
        return axios.get(`/api/guest/${username}/combined`)
}

export const createGuestBook = (data) => {
  return axios.post('/api/guest', data);
};

export const updateGuestBook = (data) => {
  return axios.put('/api/guest', data);
};

export const deleteGuestBook = (guestbookId) => {
  return axios.delete(`/api/guest/${guestbookId}`);
};