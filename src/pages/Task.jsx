import React, { memo, useEffect, useState, useLayoutEffect } from 'react'
import { Col } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { getTodos, updateTodoById, addTodo, deleteTodoById } from '../services/TodoService'
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

    useEffect(() => {
        getTodos(page.id).then((res) => setTodos(res))
        return () => { }
    }, [changeTodo])

    function swapTodo(index1, index2, todos) {
        let newTodos = [...sortTodoByIndex(todos)];

        let temp = {
            id: newTodos[index1].id,
            name: newTodos[index1].name,
            content: newTodos[index1].content,
            idCol: newTodos[index1].idCol,
            date: newTodos[index1].date
        };

        newTodos[index1].id = newTodos[index2].id;
        newTodos[index1].name = newTodos[index2].name;
        newTodos[index1].content = newTodos[index2].content;
        newTodos[index1].idCol = newTodos[index2].idCol;
        newTodos[index1].date = newTodos[index2].date;

        newTodos[index2].id = temp.id;
        newTodos[index2].name = temp.name;
        newTodos[index2].content = temp.content;
        newTodos[index2].idCol = temp.idCol;
        newTodos[index2].date = temp.date;

        return newTodos;
    }

    function sortTodoByIndex(todos) {
        todos.sort((todo1, todo2) => {
            return todo1.index - todo2.index
        })

        return todos
    }

    const onDragEnd = (result) => {

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

            const newSourceColumn = [...swapTodo(result.source.index, result.destination.index, sourceColumn)]

            const todoSource = { ...newSourceColumn[result.source.index] };
            const todoDestination = { ...newSourceColumn[result.destination.index] };

            updateTodoById(todoSource.id, todoSource)
            updateTodoById(todoDestination.id, todoDestination)

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
            let idOfNew = 0;

            const todoChange = sourceColumn[result.source.index]

            const arr1 = [...sourceColumn.slice(0, result.source.index)]
            const arr2 = [...sourceColumn.slice(result.source.index + 1, sourceColumn.length + 1)]

            sourceColumn = [...arr1, ...arr2]

            deleteTodoById(todoChange.id).then(res => {
                for (let i = result.source.index; i < sourceColumn.length; i++) {
                    updateTodoById(sourceColumn[i].id,
                        {
                            id: sourceColumn[i].id,
                            name: sourceColumn[i].name,
                            content: sourceColumn[i].content,
                            idCol: sourceColumn[i].idCol,
                            date: sourceColumn[i].date,
                            index: sourceColumn[i].index - 1
                        })
                }
            })

            addTodo({
                name: todoChange.name,
                content: todoChange.content,
                idCol: result.destination.droppableId,
                date: todoChange.date,
                index: todoChange.index
            }).then(res => {
                idOfNew = res.id

                const newDestinationColumn = [...destinationColumn.slice(0, result.destination.index), {
                    id: idOfNew,
                    name: todoChange.name,
                    content: todoChange.content,
                    idCol: result.destination.droppableId,
                    date: todoChange.date,
                    index: todoChange.index
                }, ...destinationColumn.slice(result.destination.index, destinationColumn.length + 1)]

                for (let i = result.destination.index; i < newDestinationColumn.length; i++) {
                    console.log(newDestinationColumn[i] + "-" + i);
                    updateTodoById(newDestinationColumn[i].id,
                        {
                            id: newDestinationColumn[i].id,
                            name: newDestinationColumn[i].name,
                            content: newDestinationColumn[i].content,
                            idCol: newDestinationColumn[i].idCol,
                            date: newDestinationColumn[i].date,
                            index: i
                        })
                }
            })

            setChangeTodo(!changeTodo)
            setSpin(false)
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