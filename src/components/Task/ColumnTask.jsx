import React, { memo, useEffect, useState } from 'react'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'

import TaskItem from './TaskItem'

import { getColumn } from '../../services/ColumnService'
import classes from './Task.module.css'

const ColumnTask = memo(({ idCol, todos }) => {
    const [column, setColumn] = useState({})
    const [todoForColumn, setTodoForColumn] = useState([])

    useEffect(() => {
        getColumn(idCol).then(res => setColumn(res))
    }, [idCol])

    useEffect(() => {
        setTodoForColumn(todos.filter(todo => {
            return column.id === todo.idCol
        }))
    }, [column, todos])


    return (
        <div className={classes['column-container']}>
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
            <div className={classes['column-bottom']}>
                {todoForColumn?.map(todo => {
                    return <TaskItem key={todo.id} todo={todo} />
                })}
            </div>
        </div>
    )
})

export default ColumnTask