import { describe, it } from 'vitest'

import { createAction } from '../main/index.js'

describe('createAction', () => {
  it('creates a basic action', ({ expect }) => {
    const action = createAction((_draft, _payload) => {})

    expect(action.id).toBeDefined()
  })
})
