import { describe, it } from 'vitest'

import { createSubstate } from '../main/index.js'
import { getSubstate } from '../main/managers/SubstateManager.js'

describe('createSubstate', () => {
  it('creates a basic substate', ({ expect }) => {
    const thing = createSubstate('hello world')

    expect(getSubstate(thing).current).toBe('hello world')
  })

  it('creates a basic substate using a generator', ({ expect }) => {
    const thing = createSubstate(() => 'hello world')

    expect(getSubstate(thing).current).toBe('hello world')
  })
})
