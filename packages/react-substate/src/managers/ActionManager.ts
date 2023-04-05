import {
  ActionKey,
  ActionStateModifier
} from '../Interfaces.js'
import {
  actions,
  createActionKey
} from '../Registry.js'

/**
 * Registers a new dispatchable action to modify a substate.
 *
 * @param {ActionStateModifier} stateModifier Handler function that is called to modify the state
 * during a dispatch of this action.
 * @returns {ActionKey<*>} Identifier used to later reference this action when calling dispatch.
 */
function createAction<Draft, Payload> (
  stateModifier: ActionStateModifier<Draft, Payload>
): ActionKey<Payload> {
  const actionKey = createActionKey()

  actions[actionKey] = stateModifier

  return {
    id: actionKey,
    /**
     * TypeScript typing function to provide access to the payload parameter of the action.
     *
     * @returns {undefined} Undefined.
     */
    __payload: () => (undefined as any)
  }
}

export {
  createAction
}
