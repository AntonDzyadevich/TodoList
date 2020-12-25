import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./Todolist";



type TaskPropsType = {
    key: string
    todoListId: string
    task: TaskType
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
}

export const Task: React.FC <TaskPropsType> = React.memo(({
    todoListId,
    task,
    changeTaskStatus,
    changeTaskTitle,
    removeTask
}) => {
    console.log("Task is call")
    const onClickHandler = () => removeTask(task.id, todoListId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked,todoListId);
    }


    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todoListId);
    }, [task.id, changeTaskTitle, todoListId])


    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            size={"small"}
            onChange={onChangeStatusHandler}
            checked={task.isDone}
        />
        <EditableSpan title={task.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>

})