import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import classes from './Task.module.css'
import { getCommentById } from '../../services/CommentService'
import { spreadDate } from '../../services/DateFormat';

import FormEditComment from './FormEditComment';

const Comment = (props) => {
    const [comment, setComment] = useState({})
    const [isEditComment, setIsEditComment] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        getCommentById(props.idComment).then(res => setComment(res))
    }, [props.idComment, isEdited])

    return (
        <div className={classes['todo-item__comment']}>
            <div className={classes['todo-item__comment-top']}>
                <div className={classes['comment-top__left']}>
                    <div className={classes['left-assign']}>{props.assign}</div>
                    <div className={classes['left-date']}>{spreadDate(comment.date)}</div>
                </div>
                <div className={classes['comment-top__right']}>
                    <div className={classes['btn-edit']}>
                        <EditOutlined onClick={() => {
                            setIsEditComment(true)
                        }} />
                    </div>
                    <div className={classes['btn-delete']}>
                        <DeleteOutlined onClick={() => {
                            props.onDeleteCommentHandler(props.idComment)
                        }} />
                    </div>
                </div>
            </div>
            <div className={classes['todo-item__comment-bottom']}>
                {!isEditComment && <p className={classes['comment-bottom__content']}>{comment.content}</p>}
                {isEditComment && <FormEditComment
                    comment={comment}
                    setIsEditComment={setIsEditComment}
                    isEditComment={isEditComment}
                    setIsEdited={setIsEdited}
                    isEdited={isEdited}
                />}
            </div>
        </div>
    )
}

export default Comment