import React, { useState } from 'react'
import classes from './Task.module.css'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { updateTitleTodoById } from '../../services/TodoService';

const FormTitle = ({ name, id, onChangeHandler }) => {
    const [nameTodo, setNameTodo] = useState({ name: name });
    const [isNameChanged, setIsNameChanged] = useState(false)

    const onChangeInputHandler = (event) => {
        setNameTodo((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
        setIsNameChanged(true)
    };

    const onCancelHandler = () => {
        setIsNameChanged(false)
        setNameTodo({ name: name })
    }

    const onSaveHandler = () => {
        updateTitleTodoById(id, nameTodo).then(res => { onChangeHandler(); setIsNameChanged(false) })
    }

    return (
        <div className={classes['todo-item__form-title']}>
            <input
                className={classes['form-title__input']}
                value={nameTodo.name ? nameTodo.name : "Untitled"}
                name='name'
                onChange={onChangeInputHandler}
            />
            {isNameChanged &&
                <div className={classes['form-title__button']}>
                    <button
                        className={classes['form-title__button-cancel']}
                        onClick={onCancelHandler}
                    >
                        <CloseOutlined />
                    </button>
                    <button
                        className={classes['form-title__button-save']}
                        onClick={onSaveHandler}
                    >
                        <CheckOutlined />
                    </button>
                </div>
            }
        </div>
    )
}

export default FormTitle