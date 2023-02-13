import { useEffect } from 'react'

import {
  createSubstate,
  createAction,
  useDispatch
} from 'react-substate'

interface Test {
  field1: string
}

// Set up a sub-states
const substates = {
  test: createSubstate<Test>({field1: 'the state'}),
}

// Set up some dispatchable actions
const actions = {
  updateButtonText: createAction(
    (draft: Test, payload: Test['field1']) => {
      draft.field1 = payload // Will become "the new state"
    }
  )
}

// Use it like you would `useReducer` or `useState`
const DispatchOnlyExample = () => {
  const dispatch = useDispatch(substates.test)

  useEffect(() => {
    console.log('it rendered!') // This will only ever be called one time
  })

  return (
    <button
      onClick={() => (dispatch(actions.updateButtonText, 'the new state'))}
    >
      the button
    </button>
  )
}

export default DispatchOnlyExample
