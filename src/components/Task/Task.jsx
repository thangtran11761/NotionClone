import React, { memo, useEffect, useState } from 'react'
import { Col } from 'antd'

import { getTodos } from '../../services/TodoService'
import { getTask } from '../../services/TaskService'
import classes from './Task.module.css'

import ColumnTask from './ColumnTask'

const Task = ({ page }) => {
    const [columns, setColumns] = useState([])
    const [todos, setTodos] = useState([])
    const [namePageTask, setNamePageTask] = useState("")

    useEffect(() => {
        getTask(page.id).then((res) => {
            setColumns(res.column)
            setNamePageTask(res.name)
        })
        return () => { }
    }, [])

    useEffect(() => {
        getTodos(page.id).then((res) => setTodos(res))
        return () => { }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes["container-top"]}>
                <div>{namePageTask}</div>
            </div>
            <div className={classes["container-bottom"]}>
                {columns?.map(column => {
                    return <Col span={8}>
                        <ColumnTask idCol={column} todos={todos} />
                    </Col>
                })}
            </div>
        </div>
    )
}

export default Task