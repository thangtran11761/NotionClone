import React, { memo } from 'react'
import classes from './Task.module.css'

const TaskItem = memo
    (({ todo }) => {
        return (
            <div className={classes['todo-item']}>
                {todo.name}
            </div>
        )
    })

export default TaskItem