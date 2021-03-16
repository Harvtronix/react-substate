import {
    Actions,
    DevTools,
    DevToolsOperation,
    DevToolsState,
    Substates
} from '../Interfaces'
import {actions, substates} from '../Registry'

/**
 * Flag indicating whether or not to log things to the DevTools browser extension.
 */
let isDevToolsEnabled = false

// Obtain a handle to the DevTools extension if it exists
const w = window as any
const devTools = w.__REDUX_DEVTOOLS_EXTENSION__
    ? w.__REDUX_DEVTOOLS_EXTENSION__.connect() as DevTools
    : null

/**
 * Turns on/off logging of state changes to the DevTools browser extension.
 *
 * @param {boolean} isEnabled Indicates whether or not to turn on DevTools logging.
 */
function setDevToolsEnabled (isEnabled: boolean) {
    if (!devTools) {
        return
    }

    isDevToolsEnabled = isEnabled

    if (isDevToolsEnabled) {
        devTools.init(transformState(substates))
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

    for (const key in state) {
        result[key] = ({
            listeners: state[key].listeners.length,
            patchEffects: state[key].patchEffects.length,
            state: state[key].state
        })
    }

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
    if (!devTools || !isDevToolsEnabled) {
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
