import axios from 'axios';
// const API_URL = 'http://localhost:8080/api/';
const API_URL = 'https://fathomless-harbor-59968.herokuapp.com/api/';


class CommentService {

    getComment(id, user) {
        return axios.get(API_URL + "comment?id=" + id + "&user=" + user);
        // return axios.get(API_URL + "comment?id=5f605326e31618001783ddfc&user=5f5da2d7b5891a192c0f4bf7");

    }

    updateComment(id, data) {
        return axios.put(API_URL + "comment?id=" + id, data);
    }

    uploadComment(comment) {
        return axios.post(API_URL + "comment", comment
        );


    }

}
export default new CommentService();
