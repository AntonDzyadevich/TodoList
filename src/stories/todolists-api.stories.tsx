import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from ".././api/todolist-api";

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
