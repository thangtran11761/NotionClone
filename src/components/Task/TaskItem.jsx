import React, { memo, useState } from 'react'
import { Drawer } from 'antd';
import { Draggable } from 'react-beautiful-dnd';


import classes from './Task.module.css'

const TaskItem =
    memo(({ todo, index }) => {

        const [open, setOpen] = useState(false);
        const showDrawer = () => {
            setOpen(true);
        };
        const onClose = () => {
            setOpen(false);
        };

        return (
            <>
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
                            onClick={showDrawer}
                        >
                            {todo.name ? todo.name : <p className={classes['todo-item__untitled']}>Untitled</p>}
                        </div>
                    )}
                </Draggable>
                <Drawer
                    // title={todo.name ? todo.name : "Untitled"}
                    title={<input value={todo.name ? todo.name : "Untitled"} />}

                    placement="right"
                    width={700}
                    onClose={onClose}
                    open={open}
                >
                    <p>Assign</p>
                    <p>Status...</p>
                    <hr></hr>
                    <p>Description</p>
                    <hr></hr>
                    <p>Comment...</p>

                </Drawer>
            </>

        )
    })

export default TaskItem