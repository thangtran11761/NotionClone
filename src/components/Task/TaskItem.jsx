import React, { memo, useState } from 'react'
import { Drawer, Tag, Descriptions } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

import classes from './Task.module.css'
import Comment from './Comment';

const TaskItem =
    memo(({ todo, index, status }) => {

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
                    title={<input value={todo.name ? todo.name : "Untitled"} />}
                    placement="right"
                    width={700}
                    onClose={onClose}
                    open={open}
                >
                    <Descriptions
                        contentStyle={{ fontSize: '16px' }}
                        labelStyle={{ fontSize: '15px' }}
                    >
                        <Descriptions.Item label="Assign" span={3}>{todo.assign}</Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            {
                                status === 'init'
                                    ? <Tag icon={<ClockCircleOutlined />} color="default">waiting</Tag>
                                    : status === 'doing'
                                        ? <Tag icon={<SyncOutlined spin />} color="processing">processing</Tag>
                                        : <Tag icon={<CheckCircleOutlined />} color="success">success</Tag>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}>{todo.description}</Descriptions.Item>
                    </Descriptions>
                    <hr></hr>
                    {
                        todo.listComment &&
                        todo.listComment.map(
                            cmt => <Comment assign={todo.assign} idComment={cmt} />
                        )
                    }
                    <p>Show Comment</p>
                    <hr></hr>
                    <p>Enter Comment</p>
                    <input placeholder='Enter your comment' />
                </Drawer>
            </>

        )
    })

export default TaskItem