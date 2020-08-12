import axios from 'axios';

const WRITER = "Graciela";
const REVIEW_API_URL = 'http://localhost:8080';
const WRITER_API_URL = `${REVIEW_API_URL}/writers/${WRITER}`; // `` NOT '' !!! when using axios

class ReviewDataService {
    retrieveAllReviews(name) {
        return axios.get(`${WRITER_API_URL}/reviews`);
    }
    deleteReview(name, id, title) {
        //console.log('executed service');
        return axios.delete(`${WRITER_API_URL}/reviews/${id}`);
    }
    retrieveReview(name, id){
        return axios.get(`${WRITER_API_URL}/reviews/${id}`);
    } 
    updateReview(name, id, review){
        return axios.put(`${WRITER_API_URL}/reviews/${id}`, review);
    }   
    createReview(name, review){
        return axios.post(`${WRITER_API_URL}/reviews/`, review);
    }
}

export default new ReviewDataService();