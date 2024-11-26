import { produce } from 'immer'

import { log } from './Debug.js'
import { ActionKey, GenericDispatcher, SubstateKey } from './Interfaces.js'
import { getAction } from './managers/ActionManager.js'
import { updateDevTools } from './managers/DevToolsManager.js'
import { getSubstate } from './managers/SubstateManager.js'

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
export const dispatch: GenericDispatcher = <
  SubstateType,
  ActionDraft extends SubstateType,
  ActionPayload,
  ProvidedPayload extends ActionPayload
>(
  substateKey: SubstateKey<SubstateType>,
  actionKey: ActionKey<ActionDraft, ActionPayload>,
  payload: ProvidedPayload
) => {
  log(`dispatching action ${actionKey.id} for substate ${substateKey.id}. Payload: ${payload}`)

  const substate = getSubstate(substateKey)
  const action = getAction(actionKey)

  // Update the global state via immer
  substate.value = produce(substate.value, (draft: ActionDraft) => action(draft, payload))

  // Notify all substate listeners by calling their setState function
  substate.listeners.forEach((setState) => {
    setState(substate.value)
  })

  // Notify the DevTools
  updateDevTools('Dispatch', actionKey.id)
}
