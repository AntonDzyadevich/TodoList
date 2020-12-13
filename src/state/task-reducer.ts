import {TaskStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID:string
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type ChangeTaskStatusActionType= {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListID: string
}

export type ChangeTasksTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListID: string
}

// type ActionsType =
//     | ReturnType<typeof RemoveTaskAC>
//     | ReturnType<typeof AddTaskAC>
//     | ReturnType<typeof ChangeTaskStatusAC>

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTasksTitleActionType
| AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskID);
            return stateCopy;
            // return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskID)};
            }
        case 'ADD-TASK': {
            let task: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let stateCopy = {...state}
            stateCopy[action.todoListID] = [task, ...stateCopy[action.todoListID]]
            return stateCopy;
             // return {...state,[action.todoListID]: [task, ...state[action.todoListID]]}
        }
        case 'CHANGE-TASK-STATUS':{
            const stateCopy = {...state}
            const tasks = state[action.todoListID]
            const tasksCopy = tasks.map(t => {
                if(t.id === action.taskId) {
                    return{
                        ...t, isDone: action.isDone}
                    }else {
                        return t
                    }
                })
            // const tasksCopy = [...tasks] аналогичное выражение верхней строки
            stateCopy[action.todoListID] = tasksCopy
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE':{
            const stateCopy = {...state}
            const tasks = state[action.todoListID]
            const tasksCopy = tasks
                .map(t => t.id !== action.taskId ? t : {...t, title: action.title})
                stateCopy[action.todoListID] = tasksCopy
                return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todoListId] = [];
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskID:string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskID: taskID, todoListId: todoListId}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return { type: 'ADD-TASK',title: title, todoListID: todoListID }
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType=> {
    return { type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todoListID: todoListID}
}
export const changeTasksTitleAC = (taskId: string, title: string, todoListID: string):ChangeTasksTitleActionType => {
    return {type:'CHANGE-TASK-TITLE', taskId, title, todoListID}
}

