import { produce } from 'immer'

import { log } from './Debug.js'
import { GenericDispatcher } from './Interfaces.js'
import { updateDevTools } from './managers/DevToolsManager.js'
import { handlePatchesProduced, isPatchingEnabled } from './managers/PatchManager.js'
import { getSubstate } from './managers/SubstateManager.js'
import { actions } from './Registry.js'

/**
 * This function is basically the whole point of this node module.
 *
 * Dispatches a particular action, calling its registered action handler and providing it an
 * immer-based draft object and the provided payload. This will also result in all registered
 * substate listeners being notified of the newly produced state, as well as all patch effects
 * being called.
 * @param substateKey The key of the substate that will be updated.
 * @param actionKey The action to dispatch.
 * @param payload The data to pass to the action handler function.
 */
export const dispatch: GenericDispatcher = (substateKey, actionKey, payload) => {
  log(`dispatching action ${actionKey.id} for substate ${substateKey.id}. Payload: ${payload}`)

  const substate = getSubstate(substateKey)

  // Update the global state via immer
  // Any is used to prevent infinite type errors, though it is more correctly producing whatever the
  // type is of the provided substate.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  substate.state = produce<any>(
    substate.state,
    (draft) => actions[actionKey.id]?.(draft, payload),
    // Immer will throw an error if a third arg is passed with patching disabled, so use
    // `undefined` to make it seem like there's no additional arg
    isPatchingEnabled()
      ? (patches) => {
          handlePatchesProduced(substateKey, patches)
        }
      : undefined
  )

  // Notify all substate listeners by calling their setState function
  substate.listeners.forEach((setState) => {
    // TODO: does setting the state to the actual state matter? Could it be any value?
    // Could it be the same value multiple times in a row?
    setState(substate.state)
  })

  // Notify the DevTools
  updateDevTools('Dispatch', actionKey.id)
}
