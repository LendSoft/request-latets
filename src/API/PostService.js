import axios from 'axios';

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('http://localhost:5000/posts');
        const allPosts = response.data;
        return allPosts.slice((page - 1) * limit, page * limit);
    }

    static async create(postData) {
        const response = await axios.post('http://localhost:5000/posts', postData);
        return response.data;
    }

    static async remove(postId) {
        await axios.delete(`http://localhost:5000/posts/${postId}`);
    }
}
