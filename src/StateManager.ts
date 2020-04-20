/*
Contains a collection of variables and funtions that comprise the main primitive
functions needed to support substate.
*/
import produce from 'immer'

import {
    GlobalState,
    Actions,
    ActionKey
} from './Interfaces'

/**
 * An ever-increasing index assigned to each action created by calling `createAction()`.
 */
let actionIdCounter: ActionKey = 0

/**
 * An ever-increasing index assigned to each substate created by calling `create()`.
 */
let substateKeyCounter: keyof GlobalState = 0

/**
 * The actual global registry of all substates.
 */
const globalState: GlobalState = {}

/**
 * The global actions registry for all substates.
 */
const actions: Actions = {}

// TODO: rather than just saying it is type Function... specify the params required to be passed to
// that function
/**
 * Registers a new dispatchable action to modify a substate.
 *
 * @param {keyof GlobalState} substateKey Key in the global substate registry for which this
 * action should be dispatched.
 * @param {Function} stateModifier Handler function that is called to modify the state during a
 * dispatch of this action.
 *
 * @returns {ActionKey} Identifier used to later reference this action when calling dispatch.
 */
function createAction (substateKey: keyof GlobalState, stateModifier: Function): ActionKey {
    if (!hasSubstate(substateKey)) {
        throw new Error(`Substate key ${substateKey} not registered`)
    }

    const actionId = actionIdCounter++

    actions[actionId] = {
        substateKey,
        stateModifier
    }

    return actionId
}

/**
 * Creates and registers a new substate with the given initial data.
 *
 * @param {*} initialData Initial data to be set in the substate.
 * @returns {keyof GlobalState} Identifier used to later reference this substate.
 */
function createSubstate (initialData: any): keyof GlobalState {
    const substateKey = substateKeyCounter++

    globalState[substateKey] = {
        listeners: [],
        state: initialData
    }

    return substateKey
}

/**
 * Dispatches a particular action, calling its registered action handler and providing it an
 * immer-based draft object and the provided payload.
 *
 * @param {keyof Actions} actionName The action to dispatch.
 * @param {*} payload The data to pass to the action handler function.
 */
function dispatch (actionName: keyof Actions, payload: any): void {
    const substateKey = actions[actionName].substateKey

    const newState = globalState[substateKey].state = produce(
        globalState[substateKey].state,
        (draft) => {
            actions[actionName].stateModifier(draft, payload)
        }
    )

    globalState[substateKey].listeners.forEach(
        (setState) => {
            setState(newState)
        }
    )
}

/**
 * Returns a substate with the provided key, or throws an exception if the key does not point to a
 * valid substate.
 *
 * @param {keyof GlobalState} substateKey The key of the substate to retrieve.
 * @returns {any} The substate.
 */
function getSubstate (substateKey: keyof GlobalState): any {
    if (!hasSubstate(substateKey)) {
        throw new Error(`Substate key ${substateKey} not registered`)
    }
    return globalState[substateKey].state
}

/**
 * Checks whether or not a particular substate exists for a given substate key.
 *
 * @param {keyof GlobalState} substateKey Key to check for existence.
 * @returns {boolean} true if a substate exists for the provided key; false otherwise.
 */
function hasSubstate (substateKey: keyof GlobalState): boolean {
    return substateKey in globalState
}

/**
 * Registers a new state change listener for a substate.
 *
 * @param {keyof GlobalState} substateKey Key of a substate for which this listener should be
 * registered.
 * @param {Function} setStateFunction Function to call each time the state referenced by `substateKey` is
 * updated.
 */
function registerListener (substateKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[substateKey].listeners.push(setStateFunction)
}

/**
 * Unregisters a state change listener of a substate.
 *
 * @param {keyof GlobalState} substateKey Key of a substate for which this listener should be
 * unregistered.
 * @param {Function} setStateFunction A reference to the registered function to unregister.
 */
function unregisterListener (substateKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[substateKey].listeners =
        globalState[substateKey].listeners.filter((li) => (li !== setStateFunction))
}

export default {
    createAction,
    createSubstate,
    dispatch,
    hasSubstate,
    getSubstate,
    registerListener,
    unregisterListener
}
