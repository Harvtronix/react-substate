import { describe, it } from 'vitest'

import { getAction } from '../main/managers/ActionManager.js'

describe('getAction', () => {
  it('throws an error for an unregistered substate key', ({ expect }) => {
    expect(() => getAction({ id: '-1', __draft: null, __payload: null })).toThrowError(
      `Action key ${JSON.stringify({ id: '-1', __draft: null, __payload: null })} not registered`
    )
  })
})
