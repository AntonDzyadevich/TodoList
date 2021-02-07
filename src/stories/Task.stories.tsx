import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Task',
    component: Task,
    // args: {
    //     removeTask: action('Title changed inside Task'),
    //     changeTaskStatus: action('Remove button inside Task clicked'),
    //     changeTaskTitle: action('Status changed inside Task'),
    // },
} as Meta;

const removeTaskCallback = action('Title changed inside Task')
const changeTaskStatusCallback = action('Remove button inside Task clicked')
const changeTaskTitleCallback = action('Status changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const argsBase = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}


export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...argsBase,
    task: {id: '1', isDone: true, title: "JS"},
    todolistId: '1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...argsBase,
    task: {id: '2', isDone: false, title: "JS"},
    todolistId: '2'
}