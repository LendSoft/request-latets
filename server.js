const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const postsFilePath = './posts.json';

const readPostsFromFile = () => {
    if (fs.existsSync(postsFilePath)) {
        const postsData = fs.readFileSync(postsFilePath);
        return JSON.parse(postsData);
    }
    return [];
};

const writePostsToFile = (posts) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

// Generate unique ID for new post
const generateId = () => {
    const posts = readPostsFromFile();
    const lastPost = posts[posts.length - 1];
    return lastPost ? lastPost.id + 1 : 1;
};

// GET /posts endpoint
app.get('/posts', (req, res) => {
    let { _page, _limit, _sort, _order, q } = req.query;
    let posts = readPostsFromFile();
    const totalPosts = posts.length;

    // Apply search filter
    if (q) {
        posts = posts.filter(post =>
            post.address.toLowerCase().includes(q.toLowerCase()) ||
            post.location.toLowerCase().includes(q.toLowerCase()) ||
            post.type.toLowerCase().includes(q.toLowerCase()) ||
            post.priority.toLowerCase().includes(q.toLowerCase()) ||
            post.applicant.toLowerCase().includes(q.toLowerCase()) ||
            post.phoneNumber.toLowerCase().includes(q.toLowerCase())
        );
    }

    // Apply sorting
    if (_sort) {
        posts.sort((a, b) => {
            if (_sort === 'priority') {
                return (_order === 'asc' ? a[_sort] - b[_sort] : b[_sort] - a[_sort]);
            } else if (_sort === 'applicant') {
                return (_order === 'asc' ? a[_sort].localeCompare(b[_sort]) : b[_sort].localeCompare(a[_sort]));
            }
            return 0;
        });
    }

    // Apply pagination
    if (_page && _limit) {
        const startIndex = (_page - 1) * _limit;
        const endIndex = _page * _limit;
        posts = posts.slice(startIndex, endIndex);
    }

    res.json({posts,'totalcount':totalPosts});
});

// POST /posts endpoint
app.post('/posts', (req, res) => {
    const newPost = { ...req.body, id: generateId() };
    const posts = readPostsFromFile();
    posts.push(newPost);
    writePostsToFile(posts);
    res.status(201).json(newPost);
});

// DELETE /posts/:id endpoint
app.delete('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    let posts = readPostsFromFile();
    posts = posts.filter(post => post.id !== postId);
    writePostsToFile(posts);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
