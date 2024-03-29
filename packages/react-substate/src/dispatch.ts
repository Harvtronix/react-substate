import {produce} from 'immer'

import {log} from './Debug.js'
import {ActionKey, SubstateKey} from './Interfaces.js'
import {updateDevTools} from './managers/DevToolsManager.js'
import {
  handlePatchesProduced,
  isPatchingEnabled
} from './managers/PatchManager.js'
import {hasSubstate} from './managers/SubstateManager.js'
import {
  actions,
  substates
} from './Registry.js'

/**
 * This function is basically the whole point of this node module.
 *
 * Dispatches a particular action, calling its registered action handler and providing it an
 * immer-based draft object and the provided payload. This will also result in all registered
 * substate listeners being notified of the newly produced state, as well as all patch effects
 * being called.
 *
 * @param {SubstateKey<*>} substateKey The key of the substate that will be updated.
 * @param {ActionKey<*,*>} actionKey The action to dispatch.
 * @param {*} payload The data to pass to the action handler function.
 */
export function dispatch <Type, Payload> (
  substateKey: SubstateKey<Type>,
  actionKey: ActionKey<Payload>,
  payload: Payload
): void {
  log(`dispatching action ${actionKey.id} for substate ${substateKey.id}. Payload: ${payload}`)

  if (!hasSubstate(substateKey)) {
    throw new Error(`Substate key ${substateKey} not registered`)
  }

  // Update the global state via immer
  substates[substateKey.id]!.state = produce(
    substates[substateKey.id]!.state,
    (draft) => {
      return actions[actionKey.id]!(draft, payload)
    },
    // Immer will throw an error if a third arg is passed with patching disabled, so use
    // `undefined` to make it seem like there's no additional arg
    isPatchingEnabled()
      ? (patches) => { handlePatchesProduced(substateKey, patches) }
      : undefined
  )

  // Notify all substate listeners by calling their setState function
  substates[substateKey.id]!.listeners.forEach(
    (setState) => {
      setState(substates[substateKey.id]!.state)
    }
  )

  // Notify the DevTools
  updateDevTools('Dispatch', actionKey.id)
}
