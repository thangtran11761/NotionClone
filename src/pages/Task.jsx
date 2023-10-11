import React, { memo, useEffect, useState, useLayoutEffect } from 'react'
import { Col } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { getTodos, updateTodoById, getTodoById } from '../services/TodoService'
import { getTasks } from '../services/TaskService'
import classes from '../components/Task/Task.module.css'

import ColumnTask from '../components/Task/ColumnTask'
import ModalSpin from '../components/UI/ModalSpin';

const Task = ({ page }) => {
    const [columns, setColumns] = useState([])
    const [todos, setTodos] = useState([])
    const [namePageTask, setNamePageTask] = useState("")
    const [changeTodo, setChangeTodo] = useState(true)
    const [spin, setSpin] = useState(false)

    useEffect(() => {
        getTasks().then((response) => {
            return response.find(res => res.idPage === page.id)
        })
            .then(data => {
                setColumns(data.column)
                setNamePageTask(data.name)
            })
        return () => { }
    }, [page.id])

    useLayoutEffect(() => {
        getTodos(page.id).then((res) => setTodos(res))
        return () => { }
    }, [changeTodo])

    function swapTodo(index1, index2, todos) {
        const temp = todos[index1];
        todos[index1] = todos[index2];
        todos[index2] = temp;
    }

    const onDragEnd = (result) => {
        console.log(result);

        if (!result.destination) { return }
        if (result.destination) { setSpin(true) }

        if (
            result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index
        ) { return }

        if (result.destination.droppableId === result.source.droppableId &&
            result.destination.index !== result.source.index) {
            let sourceColumn = todos.filter(todo => {
                return result.source.droppableId === todo.idCol
            })

            swapTodo(result.source.index, result.destination.index, sourceColumn)

            sourceColumn.forEach((todo, index) => {
                updateTodoById(todo.id,
                    {
                        id: todo.id,
                        name: todo.name,
                        content: todo.content,
                        idCol: todo.idCol,
                        date: todo.date,
                        index: index
                    })
            })

            setChangeTodo(!changeTodo)
            setSpin(false)
        }

        if (result.destination.droppableId !== result.source.droppableId) {
            let sourceColumn = todos.filter(todo => {
                return result.source.droppableId === todo.idCol
            })
            let destinationColumn = todos.filter(todo => {
                return result.destination.droppableId === todo.idCol
            })

            const todoChange = sourceColumn[result.source.index]

            const arr1 = sourceColumn.slice(0, result.source.index)
            const arr2 = sourceColumn.slice(result.source.index + 1, sourceColumn.length + 1)

            sourceColumn = [...arr1, ...arr2]

            destinationColumn.push(todoChange)

            swapTodo(result.destination.index, destinationColumn.length - 1, destinationColumn)

            sourceColumn.forEach((todo, index) => {
                updateTodoById(todo.id,
                    {
                        id: todo.id,
                        name: todo.name,
                        content: todo.content,
                        idCol: todo.idCol,
                        date: todo.date,
                        index: index
                    })
            })

            destinationColumn.forEach((todo, index) => {
                updateTodoById(todo.id,
                    {
                        id: todo.id,
                        name: todo.name,
                        content: todo.content,
                        idCol: todo.idCol,
                        date: todo.date,
                        index: index
                    })
            })

            setChangeTodo(!changeTodo)
            setSpin(false)

            // getTodoById(result.draggableId)
            //     .then(res => {
            //         if (res) {
            //             updateTodoById(result.draggableId,
            //                 {
            //                     id: res.id,
            //                     name: res.name,
            //                     content: res.content,
            //                     idCol: result.destination.droppableId,
            //                     date: res.date,
            //                     index: result.destination.index
            //                 })
            //                 .then(res => {
            //                     setChangeTodo(!changeTodo)
            //                     setSpin(false)
            //                 })
            //         }
            //     })
        }
    };

    return (

        <div className={classes.container}>
            {spin && <ModalSpin />}
            <div className={classes["container-top"]}>
                <div className={classes["name-page"]}>{namePageTask}</div>
            </div>
            <div className={classes["container-bottom"]}>
                <div className={classes["wrap-columns"]}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {columns?.map(column => {
                            return <Col >
                                <ColumnTask idCol={column} todos={todos} />
                            </Col>
                        })}
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Task