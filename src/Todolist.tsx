import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForms} from "./AddItemForms";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    _addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    _removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist: React.FC<PropsType>= React.memo(({
                                                            id,
                                                            title,
                                                            tasks,
                                                            filter,
                                                            removeTask,
                                                            changeFilter,
                                                            _addTask,
                                                            changeTaskStatus,
                                                            changeTaskTitle,
                                                            _removeTodoList,
                                                            changeTodoListTitle
                                                        }) => {
    console.log('Todolist is call')


    const onAllClickHandler = useCallback (() => changeFilter("all", id),
        [changeFilter,id]);
    const onActiveClickHandler = useCallback (() => changeFilter("active", id),
        [changeFilter,id]);
    const onCompletedClickHandler = useCallback (() => changeFilter("completed", id),
        [changeFilter,id]);


    const addTask = useCallback ((title: string) => {
        _addTask(title, id)
    },[_addTask,id])

    const ChangeTodoListTitle = useCallback((newTitle: string) => {
        changeTodoListTitle(id, newTitle)
    },[changeTodoListTitle,id])

    const removeTodoList = useCallback(() => _removeTodoList(id),[ _removeTodoList,id])

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3>
            <EditableSpan title={title} onChange={ChangeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForms addItem={addTask}/>
        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {
                tasksForTodolist.map(t => < Task
                    key={t.id}
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTask}
                    todoListId={id}
                />)
            }
        </ul>
        <div>
            <Button
                variant={filter === 'all' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                variant={filter === 'active' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={filter === 'completed' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
});

