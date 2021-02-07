import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import { EditableSpanPropsType, EditableSpan } from '../EditableSpan';

export default {
    title: 'Todolists/ EditableSpan',
    component:  EditableSpan,
    argTypes: {
        onChange:{
          description: 'change value'
        },
        value: {
            defaultValue: 'Hello'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => < EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('Value Editable changed')
}