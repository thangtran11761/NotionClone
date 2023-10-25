import React, { useState, useRef, useEffect } from 'react'
import classes from './Task.module.css'
import { dateFormat } from '../../services/DateFormat'
import { CheckOutlined } from '@ant-design/icons';
import { addComment } from '../../services/CommentService';
import { updateListCommentById } from '../../services/TodoService';

const FormComment = ({ idTask, listComment, onChangeHandler }) => {
    const [comment, setComment] = useState({
        idTodo: idTask,
        content: "",
        date: ""
    });
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (comment.content) {
            setIsFocused(true);
        }
        else setIsFocused(false);
    }, [comment.content])

    const onChangeInputHandler = (event) => {
        setComment((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });

        if (textareaRef.current) {
            const newRows = Math.floor(textareaRef.current.scrollHeight / 23);
            if (newRows > 1) {
                textareaRef.current.rows = newRows;
            }

            if (textareaRef.current.value.includes('\n')) {
                textareaRef.current.rows += 1;
            }
        }

        if (!event.target.value) {
            textareaRef.current.rows = 1;
        }
    };

    const isValidated = (data) => {
        let res = true;
        if (!comment.content) res = false
        return res
    }

    const onSaveHandler = (event) => {
        event.preventDefault()
        comment.date = dateFormat(new Date())
        console.log(comment);
        if (isValidated(comment)) {
            addComment(comment).then(res => {
                updateListCommentById(idTask, { listComment: [...listComment, res.id] })
                    .then(res => {
                        onChangeHandler()
                        comment.content = ""
                    })
            })
        }
    }

    return (
        <div className={classes['todo-item__form-comment']}>
            <textarea
                ref={textareaRef}
                rows={1}
                className={classes['form-comment__input']}
                placeholder='Enter your comment...'
                name='content'
                onChange={onChangeInputHandler}
                value={comment.content}
            />
            {isFocused &&
                <div>
                    <button
                        className={classes['form-comment__btn-save']}
                        onClick={onSaveHandler}
                    >
                        <CheckOutlined />
                    </button>
                </div>
            }
        </div>
    )
}

export default FormComment
