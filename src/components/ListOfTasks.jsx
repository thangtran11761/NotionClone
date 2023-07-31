import React, { memo, useEffect, useState } from 'react'

import { getTasks, addTask } from '../services/TaskService'

import Task from './Task'
import TodoTask from './TodoTask'
import InProgressTask from './InProgressTask'
import CompleteTask from './CompleteTask'

const ListOfTasks = memo(() => {
    const [tasks, setTasks] = useState([])
    const [taskTodo, setTaskTodo] = useState([])
    const [taskInProgress, setTaskInProgress] = useState([])
    const [taskComplete, setTaskComplete] = useState([])

    useEffect(() => {
        getTasks().then((res) => setTasks(res))
    }, [])

    useEffect(() => {
        sortTypeOfTasks(tasks)
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

    const addTaskHandler = () => {
        addTask({
            id: 3,
            name: "Demo3",
            content: "Demo3"
        }).then((res) => {
            console.log(res);
        });
    }

    return (
        <div>
            <TodoTask tasks={taskTodo} />
            <InProgressTask tasks={taskInProgress} />
            <CompleteTask tasks={taskComplete} />
        </div>
    )
})

export default ListOfTasks