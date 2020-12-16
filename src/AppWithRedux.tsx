import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForms} from "./AddItemForms";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTasksTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    // const todoListID1 = v1()
    // const todoListID2 = v1()
    //
    // const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer,[
    //     {id: todoListID1, title: "What to learn", filter: "all"},
    //     {id: todoListID2, title: "What to bay", filter: "all"}
    //
    // ])
    // const [tasks, dispatchToTask] = useReducer(tasksReducer, {
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Dog", isDone: true},
    //         {id: v1(), title: "Cat", isDone: true},
    //         {id: v1(), title: "Horse", isDone: false},
    //         {id: v1(), title: "Rabbit", isDone: false},
    //         {id: v1(), title: "Cow", isDone: false},
    //     ]
    // })

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatch(action)
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const action = changeTasksTitleAC(taskId, title, todoListID);
        dispatch(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListID)
        dispatch(action)
    }




    function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(filter,todoListID)
        dispatch(action)
    }
    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch(action)

    }
    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    }


    function changeTodoListTitle(title: string, todoListID: string) {
        const action = changeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }

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
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper elevation={5} style={{padding: "20px", marginLeft: "50px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodoList={removeTodoList}
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
