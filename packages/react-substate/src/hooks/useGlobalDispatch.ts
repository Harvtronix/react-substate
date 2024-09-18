import {useCallback} from 'react'

import {dispatch} from '../dispatch.js'
import {ActionKey, GlobalDispatcher, SubstateKey} from '../Interfaces.js'

/**
 * Hook that allows a component to receive a reference to a dispatch function that can be called to
 * update substates without also listening for changes to any substates.
 *
 * @returns {GlobalDispatcher} Dispatch function that can be called to update the substate.
 */
export function useGlobalDispatch (): GlobalDispatcher {
  // Since we are creating a function in this hook, memoize it so it remains the same across
  // re-renders
  return useCallback(
    <Payload>(
      substateKey: SubstateKey<unknown>,
      actionKey: ActionKey<Payload>,
      payload: Payload
    ) => (
      dispatch(substateKey, actionKey, payload)
    ),
    []
  )
}
