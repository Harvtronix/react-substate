import {SubstateKey, Substates} from '../Interfaces.js'
import {
  createSubstateKeyId,
  substates
} from '../Registry.js'
import {updateDevTools} from './DevToolsManager.js'

/**
 * Creates and registers a new substate with the given initial data.
 *
 * @param {*} initialData Initial data to be set in the substate.
 * @returns {SubstateKey<*>} Identifier used to later reference this substate.
 */
function createSubstate <Type extends Substates[any]['state']> (
  initialData: Type
): SubstateKey<Type> {
  const substateKey = createSubstateKeyId()

  // Create and register the actual substate
  substates[substateKey] = {
    listeners: [],
    patchEffects: [],
    state: initialData
  }

  // Notify the DevTools
  updateDevTools('Create Substate')

  return {
    id: substateKey,
    /**
     * TypeScript typing function to provide access to the type of the substate.
     *
     * @returns {undefined} Undefined.
     */
    __type: () => (undefined as any)
  }
}

/**
 * Returns a substate with the provided key, or throws an exception if the key does not point to a
 * valid substate.
 *
 * @param {SubstateKey<*>} substateKey The key of the substate to retrieve.
 * @returns {*} The substate.
 */
function getSubstate <Type> (substateKey: SubstateKey<Type>): Type {
  if (!hasSubstate(substateKey)) {
    throw new Error(`Substate key ${substateKey} not registered`)
  }
  // Null check performed in previous guard clause
  return substates[substateKey.id]!.state as Type
}

/**
 * Checks whether or not a particular substate exists for a given substate key.
 *
 * @param {SubstateKey<*>} substateKey Key to check for existence.
 * @returns {boolean} true if a substate exists for the provided key; false otherwise.
 */
function hasSubstate <Type> (substateKey: SubstateKey<Type>): boolean {
  return substateKey.id in substates
}

/**
 * Registers a new state change listener for a substate.
 *
 * @param {SubstateKey<*>} substateKey Key of a substate for which this listener should be
 * registered.
 * @param {Function} setStateFunction Function to call each time the state referenced by
 * `substateKey` is updated. This is typically obtained by calling the `useState` hook.
 */
function registerListener <Type> (
  substateKey: SubstateKey<Type>, setStateFunction: Function
): void {
  if (!hasSubstate(substateKey)) {
    throw new Error(`Substate key ${substateKey} not registered`)
  }

  // Null check performed in previous guard clause
  substates[substateKey.id]!.listeners.push(setStateFunction)
}

/**
 * Unregisters a state change listener of a substate.
 *
 * @param {SubstateKey<*>} substateKey Key of a substate for which this listener should be
 * unregistered.
 * @param {Function} setStateFunction A reference to the registered function to unregister. This is
 * typically one obtained by calling the `useState` hook.
 */
function unregisterListener <Type> (
  substateKey: SubstateKey<Type>, setStateFunction: Function
): void {
  if (!hasSubstate(substateKey)) {
    throw new Error(`Substate key ${substateKey} not registered`)
  }

  substates[substateKey.id]!.listeners =
      substates[substateKey.id]!.listeners.filter((li) => (li !== setStateFunction))
}

export {
  createSubstate,
  hasSubstate,
  getSubstate,
  registerListener,
  unregisterListener
}
