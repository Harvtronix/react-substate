import { useCallback } from 'react'

import { dispatch } from '../dispatch.js'
import { GenericDispatcher } from '../Interfaces.js'

/**
 * Hook that allows a component to receive a reference to a dispatch function that can be called to
 * update any Substate without also listening for changes to a Substate.
 *
 * Similar to the dispatch function obtained via `useSubstate`, except this function requires a
 * Substate key as the first argument.
 * @returns Dispatch function that can be called to update any Substate.
 */
export function useDispatch(): GenericDispatcher {
  // Since we are creating a function in this hook, memoize it so it remains the same across
  // re-renders
  return useCallback<GenericDispatcher>(
    (substateKey, actionKey, payload) => dispatch(substateKey, actionKey, payload),
    []
  )
}
