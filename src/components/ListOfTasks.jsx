import React, { memo, useEffect, useState } from 'react'

import { getTasks, addTask } from '../services/TaskService'

import Task from './Task'

const ListOfTasks = memo(() => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks().then((res) => setTasks(res))
    }, [])

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
            <button onClick={addTaskHandler}>Add Task</button>
            {tasks.map(task => {
                return <Task key={task.id} name={task.name} />
            })}
        </div>
    )
})

export default ListOfTasks