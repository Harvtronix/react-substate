import {Substates} from '../Interfaces'
import {
    createSubstateKey,
    substates
} from '../Registry'

/**
 * Creates and registers a new substate with the given initial data.
 *
 * @param {*} initialData Initial data to be set in the substate.
 * @returns {keyof Substates} Identifier used to later reference this substate.
 */
function createSubstate (initialData: any): keyof Substates {
    const substateKey = createSubstateKey()

    // Create and register the actual substate
    substates[substateKey] = {
        listeners: [],
        patchEffects: [],
        state: initialData
    }

    return substateKey
}

/**
 * Returns a substate with the provided key, or throws an exception if the key does not point to a
 * valid substate.
 *
 * @param {keyof Substates} substateKey The key of the substate to retrieve.
 * @returns {any} The substate.
 */
function getSubstate (substateKey: keyof Substates): any {
    if (!hasSubstate(substateKey)) {
        throw new Error(`Substate key ${substateKey} not registered`)
    }
    return substates[substateKey].state
}

/**
 * Checks whether or not a particular substate exists for a given substate key.
 *
 * @param {keyof Substates} substateKey Key to check for existence.
 * @returns {boolean} true if a substate exists for the provided key; false otherwise.
 */
function hasSubstate (substateKey: keyof Substates): boolean {
    return substateKey in substates
}

/**
 * Registers a new state change listener for a substate.
 *
 * @param {keyof Substates} substateKey Key of a substate for which this listener should be
 * registered.
 * @param {Function} setStateFunction Function to call each time the state referenced by
 * `substateKey` is updated. This is typically obtained by calling the `useState` hook.
 */
function registerListener (substateKey: keyof Substates, setStateFunction: Function): void {
    substates[substateKey].listeners.push(setStateFunction)
}

/**
 * Unregisters a state change listener of a substate.
 *
 * @param {keyof Substates} substateKey Key of a substate for which this listener should be
 * unregistered.
 * @param {Function} setStateFunction A reference to the registered function to unregister. This is
 * typically one obtained by calling the `useState` hook.
 */
function unregisterListener (substateKey: keyof Substates, setStateFunction: Function): void {
    substates[substateKey].listeners =
        substates[substateKey].listeners.filter((li) => (li !== setStateFunction))
}

export {
    createSubstate,
    hasSubstate,
    getSubstate,
    registerListener,
    unregisterListener
}
