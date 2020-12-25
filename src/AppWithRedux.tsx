import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForms} from "./AddItemForms";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTasksTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux ()  {
console.log("App is called")

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();


    const removeTask = useCallback((id: string, todoListID: string) => {
        const action = removeTaskAC(id, todoListID);
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID);
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
        const action = changeTasksTitleAC(taskId, title, todoListID);
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListID: string)=> {
        const action = changeTaskStatusAC(taskId, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter= useCallback((filter: FilterValuesType, todoListID: string) => {
        const action = changeTodoListFilterAC(filter,todoListID)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList= useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = changeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }, [dispatch])



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0", marginLeft: "50px"}}>
                    <AddItemForms addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];
                            let taskForTodoList = allTodoListTasks;

                            return <Grid key={v1()} item>
                                <Paper elevation={5} style={{padding: "20px", marginLeft: "50px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeTodoListFilter}
                                        _addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        _removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
