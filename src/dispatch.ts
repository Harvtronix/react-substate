import produce from 'immer'

import { Actions } from './Interfaces'
import Registry from './Registry'
import PatchManager from './managers/PatchManager'

/**
 * This function is basically the whole point of this node module.
 *
 * Dispatches a particular action, calling its registered action handler and providing it an
 * immer-based draft object and the provided payload. This will also result in all registered
 * substate listeners being notified of the newly produced state, as well as all patch effects
 * being called.
 *
 * @param {keyof Actions} actionName The action to dispatch.
 * @param {*} payload The data to pass to the action handler function.
 */
function dispatch (actionName: keyof Actions, payload: any): void {
    const substateKey = Registry.actions[actionName].substateKey

    // Update the global state via immer
    Registry.substates[substateKey].state = produce(
        Registry.substates[substateKey].state,
        (draft) => {
            return Registry.actions[actionName].stateModifier(draft, payload)
        },
        // Immer will throw an error if a third arg is passed with patching disabled, so use
        // `undefined` to make it seem like there's no additional arg
        PatchManager.isPatchingEnabled()
            ? (patches) => { PatchManager.handlePatchesProduced(substateKey, patches) }
            : undefined
    )

    // Notify all substate listeners by calling their setState function
    Registry.substates[substateKey].listeners.forEach(
        (setState) => {
            setState(Registry.substates[substateKey].state)
        }
    )
}

export default dispatch
