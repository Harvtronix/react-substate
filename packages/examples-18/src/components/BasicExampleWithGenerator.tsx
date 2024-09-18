import {
  createSubstate,
  createAction,
  useSubstate,
} from 'react-substate'

interface Test {
  someField: string
}

// Set up a substate
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

// Use it like you would `useReducer` or `useState`
const BasicExampleWithGenerator = () => {
  const [test, dispatch] = useSubstate(substates.test)

  return (
    <button
      onClick={() => (dispatch(actions.updateSomeField, 'not anymore!'))}
    >
      {test.someField}
    </button>
  )
}

export default BasicExampleWithGenerator
