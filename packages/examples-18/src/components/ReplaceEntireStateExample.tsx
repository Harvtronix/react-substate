import {
  createAction,
  createSubstate,
  useSubstate
} from 'react-substate'

// Set up some sub-states
const substates = {
  test: createSubstate('before')
}

// Set up some dispatchable actions
const actions = {
  updateButtonText: createAction(
    (_draft: string, payload: string) => {
      return payload // will replace entire state with `payload`
    }
  )
}

const ReplaceEntireStateExample = () => {
  const [test, dispatch] = useSubstate(substates.test)

  return (
    <button
      onClick={() => (dispatch(actions.updateButtonText, 'after'))}
    >
      {test}
    </button>
  )
}

export default ReplaceEntireStateExample
