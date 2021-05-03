import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodolists()
          promise.then((response) => {
                setState(response.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'GRRRR!!!'
        const promise = todolistAPI.createTodolist(title)
        promise.then((response) => {
            setState(response.data.data.item);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8582e93a-5bae-47ee-bfa5-2c02aca790f8'
        const promise = todolistAPI.deleteTodolist(todolistId)
        promise.then((response) => {
            setState(response.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3f112c99-2980-4a99-a0c5-e2e613d66615';
        const title = 'Angular!!!';
        const promise = todolistAPI.updateTodolist(todolistId,title)
        promise.then((response) => {
            setState(response.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '21f09b24-aba4-4925-a3c3-bc02c8d8bc01'
        const promise = todolistAPI.getTasks(todolistId)
        promise.then((response) => {
            setState(response.data.items);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '21f09b24-aba4-4925-a3c3-bc02c8d8bc01'
        const taskId = '8e95f5dd-584a-4c4c-a3ef-759a2bc30ddf'
        const promise = todolistAPI.deleteTask(todolistId, taskId)
        promise.then((response) => {
            setState(response.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ba71374c-fad2-4451-860b-1df9b72a3adc'
        const taskTitle = 'React'
        const promise = todolistAPI.createTask(todolistId, taskTitle)
        promise.then((response) => {
            setState(response.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '21f09b24-aba4-4925-a3c3-bc02c8d8bc01'
        const taskId = '8e95f5dd-584a-4c4c-a3ef-759a2bc30ddf'
        const promise = todolistAPI.updateTask(todolistId, taskId, {
            title: "JS",
            description: "Hello",
            status: 1 ,
            priority: 1,
            startDate: "",
            deadline: ""
        })
        promise.then((response) => {
            setState(response.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}