import {
  createSubstate,
  createAction,
  useSubstate
} from 'react-substate'

interface Test {
  someField: string
}
interface AnotherTest {
  foo: string
}

// Set up some sub-states
const substates = {
  test: createSubstate<Test>({someField: 'the state'}),
  anotherTest: createSubstate<AnotherTest>({foo: 'bar'})
}

// Set up some dispatchable actions
const actions = {
  updateSomeField: createAction(
    (draft: Test, payload: Test['someField']) => {
      draft.someField = payload // Will become "the new state"
    }
  )
}

// Use it like you would `useReducer` or `useState`
const BasicExample = () => {
  const [test, dispatch] = useSubstate(substates.test)

  return (
    <button
      onClick={() => (dispatch(actions.updateSomeField, 'the new state'))}
    >
      {test.someField}
    </button>
  )
}

export default BasicExample
