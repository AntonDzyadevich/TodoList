import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForms} from "./AddItemForms";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const ChangeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const removeTodoList = () => props.removeTodoList(props.id)


    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={ChangeTodoListTitle}/>
            {/*<button onClick={ () => props.removeTodoList(props.id) }>X</button></h3>*/}
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForms addItem={addTask}/>
        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={"primary"}
                            size={"small"}
                            onChange={onChangeStatusHandler}
                            checked={t.isDone}
                        />

                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeStatusHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                variant={props.filter === 'all' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onAllClickHandler}>All
                {/*// className={props.filter === 'all' ? "contained" : "outlined"}*/}
            </Button>
            <Button
                variant={props.filter === 'active' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? "contained" : "outlined"}
                color={"primary"}
                size={"small"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

