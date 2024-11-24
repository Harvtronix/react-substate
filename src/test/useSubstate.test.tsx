import '@testing-library/jest-dom'

import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, it } from 'vitest'

import { createAction, createSubstate, setDebugEnabled, useSubstate } from '../main/index.js'

describe('useSubstate', () => {
  setDebugEnabled(true)

  it('reports the state', ({ expect }) => {
    const substate = createSubstate('this is a test')

    function Component() {
      const s = useSubstate(substate)

      return <div>{s.current}</div>
    }

    const result = render(<Component />)

    expect(result.baseElement).toHaveTextContent('this is a test')
  })

  it('updates the state using substate-specific dispatcher', async ({ expect }) => {
    const substate = createSubstate('initial value')
    const action = createAction((_draft: string, payload: string) => {
      return payload
    })

    function Component() {
      const s = useSubstate(substate)

      return (
        <button onClick={() => s.dispatch(action, 'hello world')} type="button">
          {s.current}
        </button>
      )
    }

    const result = render(<Component />)

    await userEvent.click(result.getByText('initial value'))

    expect(result.baseElement).toHaveTextContent('hello world')
  })

  describe('errors', () => {
    it('throws an error for an unregistered substate key', ({ expect }) => {
      function Component() {
        const s = useSubstate({ id: '-1', __type: null })

        return <div>{s.current}</div>
      }

      expect(() => render(<Component />)).toThrowError(
        `Substate key ${JSON.stringify({ id: '-1', __type: null })} not registered`
      )
    })
  })
})
