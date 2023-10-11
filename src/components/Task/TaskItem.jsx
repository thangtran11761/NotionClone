import React, { memo, useState } from 'react'
// import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import classes from './Task.module.css'

const TaskItem =
    memo(({ todo, index }) => {
        return (
            <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
            >
                {(provided) => (
                    <div
                        className={classes['todo-item']}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {todo.name ? todo.name : <p className={classes['todo-item__untitled']}>Untitled</p>}
                    </div>
                )}
            </Draggable>
        )
    })

export default TaskItem