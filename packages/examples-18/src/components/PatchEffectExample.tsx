import {
  createSubstate,
  createAction,
  useDispatch,
  usePatchEffect,
  useSubstate
} from 'react-substate'

interface Test {
  field1: string
}
interface AnotherTest {
  foo: string
}

const substates = {
  test: createSubstate<Test>({field1: 'the state'}),
  anotherTest: createSubstate<AnotherTest>({foo: 'bar'})
}

const actions = {
  test: {
    updateButtonText: createAction(
      (draft: Test, payload: Test['field1']) => {
        draft.field1 = payload // Will become "the new state"
      }
    )
  },
  anotherTest: {
    updateOtherButtonText: createAction(
      (draft: AnotherTest, payload: AnotherTest['foo']) => {
        draft.foo = payload // Will become "baz"
      }
    )
  }
}

const PatchEffectExample = () => {
  const test = useSubstate(substates.test)
  const dispatch = useDispatch()

  // Create a patch effect for a single substate
  usePatchEffect((patches) => {
    console.log('I am only called when "anotherTest" updates')
    console.log(patches)
  }, substates.anotherTest) // this could be an array of substates, too

  // Create a patch effect for all substates
  usePatchEffect((patches) => {
    console.log('I am called when any substate updates')
    console.log(patches)
  })

  return (
    <>
      <button
        onClick={() => (
          test.dispatch(actions.test.updateButtonText, 'the new state')
        )}
      >
        {test.current.field1}
      </button>

      <button
        onClick={() => (
          dispatch(substates.anotherTest, actions.anotherTest.updateOtherButtonText, 'baz')
        )}
      >
        Dispatch action to update "anotherTest"
      </button>
    </>
  )
}

export default PatchEffectExample
