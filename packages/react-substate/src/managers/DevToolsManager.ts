import {log} from '../Debug.js'
import {
  Actions,
  DevTools,
  DevToolsOperation,
  DevToolsState,
  Substates
} from '../Interfaces.js'
import {actions, substates} from '../Registry.js'

let devTools: DevTools | undefined

/**
 * Turns on/off logging of state changes to the DevTools browser extension.
 *
 * @param {boolean} isEnabled Indicates whether or not to turn on DevTools logging.
 */
function setDevToolsEnabled (isEnabled: boolean) {
  if (!isEnabled) {
    devTools = undefined
    return
  }

  if (!devTools) {
    // Obtain a handle to the DevTools extension if it exists
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
 *
 * @param {Substates} state The state to transform.
 * @returns {DevToolsState} The transformed state.
 */
function transformState (state: Substates): DevToolsState {
  const result: DevToolsState = {}

  Object.keys(state).forEach((key) => {
    result[key] = {
      listeners: state[key]?.listeners.length ?? -1,
      patchEffects: state[key]?.patchEffects.length ?? -1,
      state: state[key]?.state
    }
  })

  return result
}

/**
 * Causes a "send" to the DevTools extension, resulting in the logging of a new entry based on the
 * current state of the substates registry.
 *
 * @param {DevToolsOperation} operation A string indicating the type of entry to log.
 * @param {keyof Actions?} actionKey An optional action key associated with a `dispatch` call.
 */
function updateDevTools (operation: DevToolsOperation, actionKey?: keyof Actions) {
  if (!devTools) {
    return
  }

  const action = actionKey !== undefined
    ? `${operation} Action ${actionKey}: ${actions[actionKey]}`
    : operation

  devTools.send(action, transformState(substates))
}

export {
  setDevToolsEnabled,
  updateDevTools
}
