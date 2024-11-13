import {
  createSubstate,
  createAction,
  useSubstate,
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
  anotherTest: createSubstate<AnotherTest>(() => ({foo: 'bar'}))
}

// Set up some dispatchable actions
const actions = {
  updateSomeField: createAction(
    (draft: Test, payload: Test['someField']) => {
      draft.someField = payload // Will become "the new state"
    }
  )
}

// Use it (mostly) like you would `useReducer` or `useState`
const BasicExample = () => {
  const test = useSubstate(substates.test)

  return (
    <button
      onClick={() => (test.dispatch(actions.updateSomeField, 'wow-some-stuff'))}
    >
      {test.current.someField}
    </button>
  )
}

export default BasicExample
