import React, { memo } from 'react'

const Task = memo
    (props => {
        console.log(props.name);

        return (
            <div>
                {props.name}
            </div>
        )
    })


export default Task