import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses} from '../api/todolist-api'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "",
            order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "",
            order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS",status: TaskStatuses.Completed,
                description: "", todolistId: "todolistId1", startDate: "",
                deadline: "", order: 0, priority: TaskPriorities.Low, addedDate: ""},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: "", todolistId: "todolistId1", startDate: "",
                deadline: "", order: 0, priority: TaskPriorities.Low, addedDate: ""}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                description: "", todolistId: "todolistId2", startDate: "",
                deadline: "", order: 0, priority: TaskPriorities.Low, addedDate: ""},
            {id: v1(), title: "React Book",status: TaskStatuses.Completed,
                description: "", todolistId: "todolistId2", startDate: "",
                deadline: "", order: 0, priority: TaskPriorities.Low, addedDate: ""}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
