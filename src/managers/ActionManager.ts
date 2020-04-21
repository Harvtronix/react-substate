import {
    Substates,
    ActionStateModifier,
    ActionKey
} from '../Interfaces'

import SubstateManager from './SubstateManager'
import Registry from '../Registry'

/**
 * Registers a new dispatchable action to modify a substate.
 *
 * @param {keyof Substates} substateKey Key in the global substate registry for which this
 * action should be dispatched.
 * @param {ActionStateModifier} stateModifier Handler function that is called to modify the state
 * during a dispatch of this action.
 *
 * @returns {ActionKey} Identifier used to later reference this action when calling dispatch.
 */
function createAction (
    substateKey: keyof Substates,
    stateModifier: ActionStateModifier
): ActionKey {
    if (!SubstateManager.hasSubstate(substateKey)) {
        throw new Error(`Substate key ${substateKey} not registered`)
    }

    const actionKey = Registry.createActionKey()

    Registry.actions[actionKey] = {
        substateKey,
        stateModifier
    }

    return actionKey
}

export default {
    createAction
}
