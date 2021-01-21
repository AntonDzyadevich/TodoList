import {TasksStateType} from '..//AppWithRedux';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskType} from "../AppWithRedux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTasksTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


const initialState: TasksStateType = {}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |  ChangeTasksTitleActionType |  AddTodolistActionType

    | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType=> {
    switch (action.type) {
        case 'REMOVE-TASK':
        {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId);
            return stateCopy;
            // return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskID)};
        }

        case 'ADD-TASK':
            let task: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let stateCopy = {...state}
            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy;
        // return {...state,[action.todoListID]: [task, ...state[action.todoListID]]}

        case 'CHANGE-TASK-STATUS':{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if(t.id !== action.taskId) {
                        return t
                    }else {
                        return {...t, isDone: action.isDone}
                    }
                })
            }
        }

        case 'CHANGE-TASK-TITLE':{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if(t.id !== action.taskId) {
                        return t
                    }else {
                        return {...t, title: action.title}
                    }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string):  ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS',taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string):   ChangeTasksTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE',taskId, title, todolistId}
}
