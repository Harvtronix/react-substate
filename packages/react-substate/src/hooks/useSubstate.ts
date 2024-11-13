import {useCallback, useEffect, useState} from 'react'

import {log} from '../Debug.js'
import {dispatch} from '../dispatch.js'
import {ActionKey, Dispatcher, SubstateKey} from '../Interfaces.js'
import {
  getSubstate,
  hasSubstate,
  registerListener,
  unregisterListener
} from '../managers/SubstateManager.js'

/**
 * Hook that allows a component to listen for changes to a substate and receive a reference to a
 * dispatch function that can be called to update that substate.
 *
 * @param substateKey The key of the substate to return. The returned dispatch
 * function will be scoped to this substate as well.
 * @returns Object containing the current value of the Substate and a dispatch function that can be
 * called to update it.
 */
export function useSubstate <Type> (
  substateKey: SubstateKey<Type>
): {current: Type, dispatch: Dispatcher} {
  if (!hasSubstate(substateKey)) {
    throw new Error('No substate found with key ' + substateKey)
  }

  // Since we are creating a function in this hook, memoize it so it remains the same across
  // re-renders
  const substateDispatch: Dispatcher = useCallback(
    <Payload>(actionKey: ActionKey<Payload>, payload: Payload) => (
      dispatch(substateKey, actionKey, payload)
    ),
    [substateKey]
  )

  const [, setState] = useState()

  useEffect(() => {
    log('Registering listener for ' + substateKey.id)
    registerListener(substateKey, setState)

    return () => {
      log('Unregistering listener for ' + substateKey.id)
      unregisterListener(substateKey, setState)
    }
  }, [substateKey, setState])

  return {
    current: getSubstate(substateKey),
    dispatch: substateDispatch
  }
}
