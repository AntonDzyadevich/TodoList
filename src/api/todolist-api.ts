import axios from "axios";


const settings = {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '2e8dfc3a-ddd8-4664-a36b-eb1d4d5042e7'
    }
}

const instance = axios.create({
    ...settings
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<D = {}> ={
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    title: string
    description: string
    // completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return  instance.put< BaseResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title:string) {
        return instance.post<BaseResponseType<{item: TodolistType}>>('todo-lists',{title})
    },
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },



    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string,taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId:string, taskTitle: string) {
        return instance.post<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`,
            {title: taskTitle})
    },
    updateTask(todolistId:string, taskId: string, model: UpdateTaskType ) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {model})
    },
}