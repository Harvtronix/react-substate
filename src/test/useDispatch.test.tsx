import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'
import { describe, it } from 'vitest'

import { createAction, createSubstate, useDispatch, useSubstate } from '../main/index.js'

describe('useDispatch', () => {
  it('updates a portion of the state using generic dispatcher', async ({ expect }) => {
    const substate = createSubstate({ key: 'initial value' })
    const action = createAction((draft: { key: string }, payload: string) => {
      draft.key = payload
    })

    function Component() {
      const s = useSubstate(substate)
      const dispatch = useDispatch()

      return (
        <button onClick={() => dispatch(substate, action, 'hello world')} type="button">
          {s.current.key}
        </button>
      )
    }

    const result = render(<Component />)

    await userEvent.click(result.getByText('initial value'))

    expect(result.baseElement).toHaveTextContent('hello world')
  })

  it('updates the entire state using generic dispatcher', async ({ expect }) => {
    const substate = createSubstate('initial value')
    const action = createAction((_draft: string, payload: string) => {
      return payload
    })

    function Component() {
      const s = useSubstate(substate)
      const dispatch = useDispatch()

      return (
        <button onClick={() => dispatch(substate, action, 'hello world')} type="button">
          {s.current}
        </button>
      )
    }

    const result = render(<Component />)

    await userEvent.click(result.getByText('initial value'))

    expect(result.baseElement).toHaveTextContent('hello world')
  })
})
