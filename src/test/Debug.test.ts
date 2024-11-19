import { afterAll, describe, it } from 'vitest'

import { log, setDebugEnabled } from '../main/Debug.js'

afterAll(() => {
  setDebugEnabled(false)
})

describe('Debug', () => {
  it('does not crash when logging a value with debug on', ({ expect }) => {
    setDebugEnabled(true)
    expect(() => log('hello')).not.toThrow()
  })

  it('does not crash when logging a value with debug off', ({ expect }) => {
    setDebugEnabled(false)
    expect(() => log('hello')).not.toThrow()
  })
})
