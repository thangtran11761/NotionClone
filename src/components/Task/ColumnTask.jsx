import React, { memo, useEffect, useState } from 'react'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from "react-redux";

import TaskItem from './TaskItem'
import { getColumn } from '../../services/ColumnService'
import { dateFormat } from '../../services/DateFormat';
import classes from './Task.module.css'

const ColumnTask = memo(({ idCol, todos }) => {
    const [column, setColumn] = useState({})
    const [todoForColumn, setTodoForColumn] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        getColumn(idCol).then(res => setColumn(res))
    }, [idCol])

    useEffect(() => {
        setTodoForColumn(todos.filter(todo => {
            return column.id === todo.idCol
        }))
    }, [column, todos])

    function sortTodo(todos) {
        todos.sort((todo1, todo2) => {
            return todo1.index - todo2.index
        })

        return todos
    }

    const addTodoHandler = () => {
        const date = new Date();
        dispatch({
            type: "addTodo",
            data: {
                name: "",
                content: "",
                idCol: idCol,
                date: dateFormat(date),
                index: todoForColumn.length
            }
        });
    }

    return (
        <div className={classes['column-container']} >
            <div className={classes['column-top']}>
                <div className={classes['column-top_left']}>
                    <div className={classes['column-top_name']}>{column.name}</div>
                    <div className={classes['column-top_sum']}>{todoForColumn && todoForColumn.length}</div>
                </div>
                <div className={classes['column-top_right']}>
                    <div className={classes['column-top_extension']}><EllipsisOutlined /></div>
                    <div className={classes['column-top_new']}><PlusOutlined /></div>
                </div>
            </div>
            <Droppable droppableId={idCol} >
                {(provided) => (
                    <div
                        className={classes['column-bottom']}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {todoForColumn && sortTodo(todoForColumn).map((todo, index) => (
                            <TaskItem key={todo.id} todo={todo} index={index} />
                        ))}
                        <div
                            className={classes['column-btn__add-todo']}
                            onClick={addTodoHandler}
                        >
                            <PlusOutlined /> New
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
})

export default ColumnTask