import axios from "axios";

const settings= {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY' : '2e8dfc3a-ddd8-4664-a36b-eb1d4d5042e7'
    }
}

const instance = axios.create({
    ...settings
})

type TodolistType = {
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

// type ResponseCreateType = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: {
//         item: TodolistType
//     }
// }

// type ResponseUpdateDeleteType ={
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: {}
// }

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
    }

}