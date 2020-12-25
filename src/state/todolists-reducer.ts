import {TodoListType, FilterValuesType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

export type ActionType = ChangeTodolistFilterActionType |
    ChangeTodolistTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState: Array<TodoListType> = [];

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            let todoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...state, todoList]
        case 'CHANGE-TODOLIST-TITLE':
        {
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, title: action.title} : tl
                )
            ];
        }
        case 'CHANGE-TODOLIST-FILTER':
        {
            return [
                ...state.map(tl =>
                    (tl.id === action.id) ? {...tl, filter: action.filter} : tl
                )
            ];
        }

        default:
            return state
    }
}



export const removeTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
}
export const addTodoListAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title: string, id:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',
            id: id,
            title: title}
}
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
