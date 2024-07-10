import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MySelect from '../components/UI/select/MySelect';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ query: '', type: '', prioritySort: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const sortedAndSearchedPosts = usePosts(posts, filter.query, filter.type, filter.prioritySort);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts', {
                params: {
                    _limit: limit,
                    _page: page,
                    q: filter.query // Pass query filter to backend
                },
            });
            setPosts(response.data.posts);
            setTotalPages(getPageCount(response.data.totalcount, limit)); // Calculate total pages using getPageCount
            console.log(getPageCount(response.data.totalcount, limit));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, [page, limit, filter.query]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const createPost = async (newPost) => {
        try {
            const response = await axios.post('http://localhost:5000/posts', newPost);
            setPosts([...posts, response.data]);
            setModal(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const removePost = async (post) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${post.id}`);
            setPosts(posts.filter((p) => p.id !== post.id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const changePage = (page) => {
        setPage(page);
    };

    const changeLimit = (limit) => {
        setLimit(limit);
        setPage(1);
    };

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать заявку
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={(value) => changeLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                ]}
            />
            <PostList posts={sortedAndSearchedPosts} remove={removePost} title="Заявки" />
            <Pagination totalPages={totalPages} page={page} changePage={changePage} />
        </div>
    );
}

export default Posts;
