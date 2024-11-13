import {
  createSubstate,
  createAction,
  useSubstate,
} from 'react-substate'

interface Test {
  someField: string
}

// Set up a substate by passing a state generator function to seed the Substate
const substates = {
  test: createSubstate<Test>(() => ({someField: 'it is generated!'})),
}

// Set up some dispatchable actions
const actions = {
  updateSomeField: createAction(
    (draft: Test, payload: Test['someField']) => {
      draft.someField = payload // Will become "not anymore"
    }
  )
}

// Use the hook to get the current state data and dispatch actions
const BasicExampleWithGenerator = () => {
  const test = useSubstate(substates.test)

  return (
    <button
      onClick={() => (test.dispatch(actions.updateSomeField, 'not anymore!'))}
    >
      {test.current.someField}
    </button>
  )
}

export default BasicExampleWithGenerator
