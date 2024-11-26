import { dispatch } from '../dispatch.js'
import { Substate, SubstateKey } from '../Interfaces.js'
import { createSubstateId, substates } from '../Registry.js'
import { updateDevTools } from './DevToolsManager.js'

/**
 * Creates and registers a new substate with the given initial data. If the provided data is a
 * generator function, it is invoked immediately and its return value stored in the substate.
 * @param initialData Initial data to be set in the substate.
 * @returns Identifier used to later reference this substate.
 */
function createSubstate<Type>(initialData: Type | (() => Type)): SubstateKey<Type> {
  const substateId = createSubstateId()

  const substateKey = {
    id: substateId,
    /**
     * Internal property that provides access to the type of the Substate.
     */
    __type: null as Type
  }

  // Create and register the actual Substate
  const substate: Substate<Type> = {
    listeners: [],
    value: initialData instanceof Function ? initialData() : initialData,
    dispatch: (actionKey, payload) => dispatch(substateKey, actionKey, payload)
  }
  substates[substateId] = substate

  // Notify the DevTools
  updateDevTools('Create Substate')

  return substateKey
}

/**
 * Gets a substate from the registry in a type-safe and null-safe manner, or throws an exception if
 * the key does not point to a valid substate.
 * @param substateKey The key of the substate to retrieve.
 * @returns The substate.
 */
function getSubstate<Type>(substateKey: SubstateKey<Type>): Substate<Type> {
  const substate = substates[substateKey.id]

  if (substate === undefined) {
    throw new Error(`Substate key ${JSON.stringify(substateKey)} not registered`)
  }

  return substate as Substate<Type>
}

/**
 * Registers a new state change listener for a substate. This is important because it provides the
 * mechanism by which React is told that the value of a Substate has changed.
 * @param substateKey Key of a substate for which this listener should be registered.
 * @param setStateFunction Function to call each time the state referenced by `substateKey` is
 * updated. This is typically obtained by calling the `useState` hook.
 */
function registerListener(
  substateKey: SubstateKey<unknown>,
  setStateFunction: (...args: unknown[]) => void
): void {
  getSubstate(substateKey).listeners.push(setStateFunction)
}

/**
 * Unregisters a state change listener of a substate.
 * @param substateKey Key of a substate for which this listener should be unregistered.
 * @param setStateFunction A reference to the registered function to unregister. This is typically
 * one obtained by calling the `useState` hook.
 */
function unregisterListener(
  substateKey: SubstateKey<unknown>,
  setStateFunction: (...args: unknown[]) => void
): void {
  const substate = getSubstate(substateKey)

  substate.listeners = substate.listeners.filter((li) => li !== setStateFunction)
}

export { createSubstate, getSubstate, registerListener, unregisterListener }
