import React, { useState } from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput'; 
import MyButton from './UI/button/MyButton'; 

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ 
        address: '', location: '', type: '', priority: '', applicant: '', phoneNumber: ''
    });
    const [postIdCounter, setPostIdCounter] = useState(1);

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            id: postIdCounter 
        };
        create(newPost);
        setPostIdCounter(prevCounter => prevCounter + 1);
        setPost({ address: '', location: '', type: '', priority: '', applicant: '', phoneNumber: '' });
    };

    return (
        <form onSubmit={addNewPost}>
            <MySelect
                value={post.location}
                onChange={(value) => setPost({ ...post, location: value })}
                options={[
                    { value: 'близко', name: 'Близко' },
                    { value: 'далеко', name: 'Далеко' }
                ]}
                defaultValue="Выберите местоположение"
            />
            <MySelect
                value={post.type}
                onChange={(value) => setPost({ ...post, type: value })}
                options={[
                    { value: 'Порыв', name: 'Порыв' },
                    { value: 'Утечка', name: 'Утечка' },
                    { value: 'Колонка уличная', name: 'Колонка уличная' },
                    { value: 'Некачественная вода', name: 'Некачественная вода' },
                    { value: 'Закупорка', name: 'Закупорка' },
                    { value: 'Другое', name: 'Другое' }
                ]}
                defaultValue="Выберите тип аварии"
            />
            <MySelect
                value={post.priority}
                onChange={(value) => setPost({ ...post, priority: value })}
                options={[
                    { value: '1', name: '1 - Незамедлительно' },
                    { value: '2', name: '2 - Высокий' },
                    { value: '3', name: '3 - Средний' },
                    { value: '4', name: '4 - Низкий' }
                ]}
                defaultValue="Выберите приоритет"
            />
            <MyInput
                value={post.address}
                onChange={(event) => setPost({ ...post, address: event.target.value })}
                type="text"
                placeholder="Адрес"
            />
            <MyInput
                value={post.applicant}
                onChange={(event) => setPost({ ...post, applicant: event.target.value })}
                type="text"
                placeholder="Заявитель"
            />
            <MyInput
                value={post.phoneNumber}
                onChange={(event) => setPost({ ...post, phoneNumber: event.target.value })}
                type="text"
                placeholder="Номер телефона"
            />
            <MyButton type="submit">Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
