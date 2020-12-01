//user
export type StateType = {
    age: number
    childrenCount: number
    name: string
}

//action
type ActionType = {
    type: string
    [key: string]: any
}

//case 'CHANGE-NAME'
//case 'INCREMENT-AGE'
//case 'INCREMENT-CHILDREN-COUNT'


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            // state.age = state.age + 1;
            const newState = {...state}
            newState.age = state.age + 1
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            // state.childrenCount = state.childrenCount + 1;
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE-NAME':
            return {...state, name: action.name}
        default:
            throw new Error("I don't understand this type")
    }
}
