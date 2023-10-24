import React, { useState, useEffect, useRef } from 'react'
import classes from './Task.module.css'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { updateContentCommentById } from '../../services/CommentService';

const FormEditComment = ({ comment, setIsEditComment, isEditComment, setIsEdited, isEdited }) => {
    const [contentComment, setContentComment] = useState({ content: comment.content });
    const inputCommentRef = useRef(null);

    useEffect(() => {
        if (isEditComment) {
            inputCommentRef.current.focus();
        }
        // return () => {
        //     inputCommentRef.current.blur();
        // };
    }, [isEditComment])

    const onChangeInputHandler = (event) => {
        setContentComment((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const onCancelEditHandler = () => {
        setIsEditComment(false)
        setContentComment({ content: comment.content })
    }

    const onSaveEditHandler = () => {
        updateContentCommentById(comment.id, contentComment)
            .then(res => {
                setIsEdited(!isEdited)
                setIsEditComment(false)
            })
    }

    return (
        <div className={classes['comment-bottom__form-comment']}>
            <input
                className={classes['form-comment__input']}
                value={contentComment.content}
                name='content'
                onChange={onChangeInputHandler}
                ref={inputCommentRef}
            />
            <div className={classes['form-comment__button']}>
                <button
                    className={classes['form-comment__button-save']}
                    onClick={onSaveEditHandler}
                >
                    <CheckOutlined />
                </button>
                <button
                    className={classes['form-comment__button-cancel']}
                    onClick={onCancelEditHandler}
                >
                    <CloseOutlined
                        className={classes['button-cancel__icon']}
                    />
                </button>
            </div>
        </div>
    )
}

export default FormEditComment