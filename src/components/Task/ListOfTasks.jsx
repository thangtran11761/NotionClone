import React, { memo, useEffect, useState } from 'react'
import { Col } from 'antd'

import { getTodos } from '../../services/TodoService'
import classes from './Task.module.css'

import TodoTask from './TodoTask'
import InProgressTask from './InProgressTask'
import CompleteTask from './CompleteTask'

const ListOfTasks = () => {
    const [tasks, setTasks] = useState([])
    const [taskTodo, setTaskTodo] = useState([])
    const [taskInProgress, setTaskInProgress] = useState([])
    const [taskComplete, setTaskComplete] = useState([])

    useEffect(() => {
        console.log('get tasks');
        getTodos().then((res) => setTasks(res))

        return () => { }
    }, [])

    useEffect(() => {
        console.log('sortTypeOfTasks');
        if (tasks) {
            sortTypeOfTasks(tasks)
        }

        return () => { }
    }, [tasks])

    const sortTypeOfTasks = (tasks) => {
        tasks.forEach((task) => {
            if (task.status === "TODO") {
                setTaskTodo(prev => { return [...prev, task] })
            }
            if (task.status === "INPROGRESS") {
                setTaskInProgress(prev => { return [...prev, task] })
            }
            if (task.status === "COMPLETE") {
                setTaskComplete(prev => { return [...prev, task] })
            }
        })
    }

    // const addTaskHandler = () => {
    //     addTask({
    //         name: "Demo4",
    //         content: "Demo4",
    //         type: "TASK",
    //         status: "TODO"
    //     }).then((res) => {
    //         console.log(res);
    //     });
    // }

    return (
        <div className={classes.container}>
            <div className={classes["container-bottom"]}>
                <Col span={8}>
                    <TodoTask tasks={taskTodo} />
                </Col>
                <Col span={8}>
                    <InProgressTask tasks={taskInProgress} />
                </Col>
                <Col span={8}>
                    <CompleteTask tasks={taskComplete} />
                </Col>
            </div>

        </div>
    )
}

export default ListOfTasks