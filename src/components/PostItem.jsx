import React from 'react';
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {props.post.address}</strong>
                <div>{props.post.location}</div>
                <div>{props.post.type}</div>
                <div>{props.post.priority}</div>
                <div>{props.post.applicant}</div>
                <div>{props.post.phoneNumber}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;
