import { describe, it } from 'vitest'

import { createAction, createSubstate, useDispatch, useSubstate } from '../main/index.js'
import { getSubstate } from '../main/managers/SubstateManager.js'

describe('createAction', () => {
  it('updates a substate via dispatched action', ({ expect }) => {
    const substate = createSubstate('')
    const action = createAction((_draft: string, payload: string) => {
      return payload
    })
    const dispatch = useDispatch()

    const ss = useSubstate(substate)
    ss.dispatch(action, '')

    dispatch(substate, action, '')

    expect(getSubstate(substate).state).toBe('')
  })
})
