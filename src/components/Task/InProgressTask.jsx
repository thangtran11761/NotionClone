import React, { memo } from 'react'

import Task from './Task'

const InProgressTask = memo(({ tasks }) => {
    return (
        <div>
            {tasks.map(task => {
                return <Task key={task.id} task={task} />
            })}
        </div>
    )
})

export default InProgressTask