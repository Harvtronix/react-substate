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

export { createAction }
