import {TasksStateType} from '..//AppWithRedux';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

// export type AddTasksActionType = {
//     type: 'ADD-TASK'
//     title: string
//     todolistId: string
// }

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

export type ChangeTasksTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


const initialState: TasksStateType = {}

type AddTasksActionType =  ReturnType<typeof addTaskAC>
type ActionsType = RemoveTaskActionType
    | AddTasksActionType
    | ChangeTaskStatusActionType
    |  ChangeTasksTitleActionType
    |  AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | SetTodolistsActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType=> {
    switch (action.type) {
        case 'REMOVE-TASK':
        {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId);
            return stateCopy;
            // return {...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskID)};
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     description: "",
            //     todoListId: action.todolistId,
            //     startDate: "",
            //     deadline: "",
            //     order: 0,
            //     priority: TaskPriorities.Low,
            //     addedDate:""
            // }
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = [newTask,...tasks];
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy;
            let task: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: "",
                todolistId: action.todolistId,
                startDate: "",
                deadline: "",
                order: 0,
                priority: TaskPriorities.Low,
                addedDate:""
            }
            let stateCopy = {...state}
            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS':{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if(t.id !== action.taskId) {
                        return t
                    }else {
                        return {...t, isDone: action.status}
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

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
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


//action creator
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string):  ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS',taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string):   ChangeTasksTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE',taskId, title, todolistId}
}


export type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)


export const addTaskAC = (title:string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId } as const)



// thunk creator
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    debugger
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data
            dispatch(addTaskAC(todolistId, title))
        })
}