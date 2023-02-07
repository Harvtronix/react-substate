import {
  Actions,
  ActionStateModifier
} from '../Interfaces'
import {
  actions,
  createActionKey
} from '../Registry'

/**
 * Registers a new dispatchable action to modify a substate.
 *
 * @param {ActionStateModifier} stateModifier Handler function that is called to modify the state
 * during a dispatch of this action.
 * @returns {keyof Actions} Identifier used to later reference this action when calling dispatch.
 */
export function createAction (
  stateModifier: ActionStateModifier
): keyof Actions {
  const actionKey = createActionKey()

  actions[actionKey] = stateModifier

  return actionKey
}
