import React, { memo, useEffect, useState } from 'react'
import { Col } from 'antd'

import { getTodos } from '../services/TodoService'
import { getTasks } from '../services/TaskService'
import classes from '../components/Task/Task.module.css'

import ColumnTask from '../components/Task/ColumnTask'

const Task = ({ page }) => {
    const [columns, setColumns] = useState([])
    const [todos, setTodos] = useState([])
    const [namePageTask, setNamePageTask] = useState("")

    useEffect(() => {
        getTasks().then((response) => {
            return response.find(res => res.idPage === page.id)
        })
            .then(data => {
                setColumns(data.column)
                setNamePageTask(data.name)
            })
        return () => { }
    }, [page.id])

    useEffect(() => {
        getTodos(page.id).then((res) => setTodos(res))
        return () => { }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes["container-top"]}>
                <div className={classes["name-page"]}>{namePageTask}</div>
            </div>
            <div className={classes["container-bottom"]}>
                <div className={classes["wrap-columns"]}>
                    {columns?.map(column => {
                        return <Col >
                            <ColumnTask idCol={column} todos={todos} />
                        </Col>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Task