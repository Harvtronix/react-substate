import produce from 'immer'

import {log} from './Debug'
import {Actions, Substates} from './Interfaces'
import {
    handlePatchesProduced,
    isPatchingEnabled
} from './managers/PatchManager'
import {
    actions,
    substates
} from './Registry'

/**
 * This function is basically the whole point of this node module.
 *
 * Dispatches a particular action, calling its registered action handler and providing it an
 * immer-based draft object and the provided payload. This will also result in all registered
 * substate listeners being notified of the newly produced state, as well as all patch effects
 * being called.
 *
 * @param {keyof Substates} substateKey The key of the substate that will be updated.
 * @param {keyof Actions} actionKey The action to dispatch.
 * @param {*} payload The data to pass to the action handler function.
 */
export function dispatch (
    substateKey: keyof Substates,
    actionKey: keyof Actions,
    payload: any
): void {
    log(`dispatching action ${actionKey} for substate ${substateKey}. Payload: ${payload}`)

    // Update the global state via immer
    substates[substateKey].state = produce(
        substates[substateKey].state,
        (draft) => {
            return actions[actionKey](draft, payload)
        },
        // Immer will throw an error if a third arg is passed with patching disabled, so use
        // `undefined` to make it seem like there's no additional arg
        isPatchingEnabled()
            ? (patches) => { handlePatchesProduced(substateKey, patches) }
            : undefined
    )

    // Notify all substate listeners by calling their setState function
    substates[substateKey].listeners.forEach(
        (setState) => {
            setState(substates[substateKey].state)
        }
    )
}
