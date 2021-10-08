import React from 'react'

import {
    createSubstate,
    createAction,
    useSubstate
} from 'react-substate'

// Set up some sub-states
const substates = {
    test: createSubstate({field1: 'the state'}),
    anotherTest: createSubstate({foo: 'bar'})
}

// Set up some dispatchable actions
const actions = {
    updateButtonText: createAction(
        (draft, payload) => {
            draft.field1 = payload // Will become "the new state"
        }
    )
}

// Use it like you would `useReducer` or `useState`
const BasicExample = () => {
    const [test, dispatch] = useSubstate(substates.test)

    return (
        <button
            onClick={() => (dispatch(actions.updateButtonText, 'the new state'))}
        >
            {test.field1}
        </button>
    )
}

export default BasicExample
