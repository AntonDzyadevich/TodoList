import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todoListsReducer} from "./todolists-reducer";


const rootReducer= combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer)


export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store