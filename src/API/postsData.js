import fs from 'fs';
import path from 'path';

const filePath = path.resolve('posts.json');

let posts = [];

const loadPosts = () => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        posts = JSON.parse(fileData);
    }
};

const savePosts = () => {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
};

export const getAllPosts = async () => {
    loadPosts();
    return posts;
};

export const createPost = async (newPost) => {
    loadPosts();
    posts.push(newPost);
    savePosts();
    return newPost;
};

export const deletePost = async (postId) => {
    loadPosts();
    posts = posts.filter(post => post.id !== postId);
    savePosts();
};
