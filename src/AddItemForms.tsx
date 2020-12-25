import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormsPropsType = {
    addItem: (title: string) => void
}

export const AddItemForms = React.memo( (props: AddItemFormsPropsType) => {
    console.log('AddItemForms called')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null);
        }
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
        <IconButton color={"primary"} onClick={addTask}>
            <AddBox/>
        </IconButton>
    </div>
} );