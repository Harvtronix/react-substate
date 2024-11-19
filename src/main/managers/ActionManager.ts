import { Action, ActionKey } from '../Interfaces.js'
import { actions, createActionKey } from '../Registry.js'

/**
 * Registers a new dispatchable action to modify a substate.
 * @param stateModifier Handler function that is called to modify the state during a dispatch of
 * this action.
 * @returns Identifier used to later reference this action when calling dispatch.
 */
function createAction<Draft, Payload>(
  stateModifier: Action<Draft, Payload>
): ActionKey<Draft, Payload> {
  const actionKey = createActionKey()

  actions[actionKey] = stateModifier as Action<unknown, unknown>

  return {
    id: actionKey,
    /**
     * Internal property to provide access to the type information of the Draft.
     */
    __draft: null as Draft,
    /**
     * Internal property to provide access to the type information of the Payload.
     */
    __payload: null as Payload
  }
}

/**
 * Gets an action from the registry in a type-safe and null-safe manner, or throws an exception if
 * the key does not point to a valid action.
 * @param actionKey The key of the action to retrieve.
 * @returns The action.
 */
function getAction<Draft, Payload>(actionKey: ActionKey<Draft, Payload>): Action<Draft, Payload> {
  const action = actions[actionKey.id]

  if (action === undefined) {
    throw new Error(`Action key ${JSON.stringify(actionKey)} not registered`)
  }

  return action as Action<Draft, Payload>
}

export { createAction, getAction }
