import { Action, ActionKey } from '../Interfaces.js'
import { actions, createActionId } from '../Registry.js'

/**
 * Registers a new dispatchable action to modify a Substate.
 * @param producer Function that is called during a dispatch that "produces" a new value for a
 * Substate by either modifying the `draft` or returning a new value.
 * @returns Identifier used to later reference this Action when calling dispatch.
 */
function createAction<Draft, Payload>(producer: Action<Draft, Payload>): ActionKey<Draft, Payload> {
  const actionId = createActionId()

  actions[actionId] = producer as Action<unknown, unknown>

  return {
    id: actionId,
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
