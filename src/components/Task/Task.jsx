import React, { memo } from 'react'

const Task = memo
    (({ task }) => {
        return (
            <div>
                {task.name}
            </div>
        )
    })


export default Task