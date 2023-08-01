import React, { memo } from 'react'

import Task from './Task'

const TodoTask = memo(({ tasks }) => {
    return (
        <div>
            {tasks?.map(task => {
                return <Task key={task.id} task={task} />
            })}
        </div>
    )
})

export default TodoTask