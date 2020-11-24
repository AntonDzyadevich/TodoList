import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormsPropsType = {
    addItem: (title: string) => void
}

export function AddItemForms(props: AddItemFormsPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField
            variant={"outlined"}
            value={title}
            error={!!error}
            label={"Title"}
            helperText={error}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}

        />
        {/*<button onClick={addTask}>+</button>*/}
        {/*<Button variant={"contained"} color={"primary"} onClick={addTask}>+</Button>*/}
        {/*{error && <div className="error-message">{error}</div>}*/}
        <IconButton color={"primary"} onClick={addTask}>
            <AddBox/>
        </IconButton>
    </div>
}