import { log } from '../Debug.js'
import { Actions, DevTools, DevToolsOperation, DevToolsState, Substates } from '../Interfaces.js'
import { actions, substates } from '../Registry.js'

let devTools: DevTools | undefined

/**
 * Turns on/off logging of state changes to the DevTools browser extension.
 * @param isEnabled Indicates whether or not to turn on DevTools logging.
 */
function setDevToolsEnabled(isEnabled: boolean) {
  if (!isEnabled) {
    devTools = undefined
    return
  }

  if (!devTools) {
    // Obtain a handle to the DevTools extension if it exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = typeof window !== 'undefined' ? (window as any) : null

    const interval = setInterval(() => {
      log('Attempting to connect to redux devtools...')
      devTools = w?.__REDUX_DEVTOOLS_EXTENSION__?.connect()

      if (!devTools) {
        return
      }

      clearInterval(interval)

      log('Connected to redux devtools!')
      devTools.init(transformState(substates))
    }, 3000)
  }
}

/**
 * Converts the substates registry into a more appropriate form for the DevTools log.
 * @param substates The state to transform.
 * @returns The transformed state.
 */
function transformState(substates: Substates): DevToolsState {
  const result: DevToolsState = {}

  Object.entries(substates).forEach(([key, substate]) => {
    result[key] = {
      listeners: substate.listeners.length ?? -1,
      current: substate.current
    }
  })

  return result
}

/**
 * Causes a "send" to the DevTools extension, resulting in the logging of a new entry based on the
 * current state of the substates registry.
 * @param operation A string indicating the type of entry to log.
 * @param actionKey An optional action key associated with a `dispatch` call.
 */
function updateDevTools(operation: DevToolsOperation, actionKey?: keyof Actions) {
  if (!devTools) {
    return
  }

  const action =
    actionKey !== undefined ? `${operation} Action ${actionKey}: ${actions[actionKey]}` : operation

  devTools.send(action, transformState(substates))
}

export { setDevToolsEnabled, updateDevTools }
