import React, { memo, useEffect, useState } from 'react'
import { Drawer, Tag, Descriptions } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

import classes from './Task.module.css'
import { getTodoById, updateListCommentById } from '../../services/TodoService';
import { deleteCommentById } from '../../services/CommentService';

import FormTitle from './FormTitle';
import Comment from './Comment';
import FormComment from './FormComment';

const TaskItem =
    memo(({ todo, index, status }) => {
        const [open, setOpen] = useState(false);
        const [task, setTask] = useState({})
        const [changeTodo, setChangeTodo] = useState(false)

        useEffect(() => {
            getTodoById(todo.id).then(res => { setTask(res); console.log(res); })
        }, [todo, changeTodo])

        const showDrawer = () => {
            setOpen(true);
        };
        const onClose = () => {
            setOpen(false);
        };

        const onChangeHandler = () => {
            setChangeTodo(!changeTodo)
        }

        const onDeleteCommentHandler = (id) => {
            let newListCmt = task.listComment.filter(idCmt => idCmt !== id)

            deleteCommentById(id).then(res =>
                updateListCommentById(task.id, { listComment: newListCmt })
                    .then(res => onChangeHandler())
            )
        }

        return (
            <>
                <Draggable
                    key={task.id}
                    draggableId={task.id}
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
                            {task.name ? task.name : <p className={classes['todo-item__untitled']}>Untitled</p>}
                        </div>
                    )}
                </Draggable>
                <Drawer
                    title={<FormTitle name={task.name} id={task.id} onChangeHandler={onChangeHandler} />}
                    placement="right"
                    width={700}
                    onClose={onClose}
                    open={open}
                >
                    <div className={classes['padding-0-20']}>
                        <Descriptions
                            contentStyle={{ fontSize: '16px' }}
                            labelStyle={{ fontSize: '15px' }}
                        >
                            <Descriptions.Item label="Assign" span={3}>{task.assign}</Descriptions.Item>
                            <Descriptions.Item label="Status" span={3}>
                                {
                                    status === 'init'
                                        ? <Tag icon={<ClockCircleOutlined />} color="default">waiting</Tag>
                                        : status === 'doing'
                                            ? <Tag icon={<SyncOutlined spin />} color="processing">processing</Tag>
                                            : <Tag icon={<CheckCircleOutlined />} color="success">success</Tag>
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Description" span={3}>{task.description}</Descriptions.Item>
                        </Descriptions>
                        <hr className={classes['border-top-1-solid-cfcfcd']}></hr>
                        {
                            task.listComment &&
                            task.listComment.map(
                                cmt => <Comment assign={task.assign} idComment={cmt} onDeleteCommentHandler={onDeleteCommentHandler} />
                            )
                        }
                        <FormComment
                            idTask={task.id}
                            listComment={task.listComment}
                            onChangeHandler={onChangeHandler}
                        />
                        <hr className={classes['border-top-1-solid-cfcfcd']}></hr>
                    </div>

                </Drawer>
            </>

        )
    })

export default TaskItem