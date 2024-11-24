import { useEffect, useMemo, useState } from 'react'

import { log } from '../Debug.js'
import { Dispatcher, SubstateKey } from '../Interfaces.js'
import { getSubstate, registerListener, unregisterListener } from '../managers/SubstateManager.js'

/**
 * Hook that allows a component to listen for changes to a substate and receive a reference to a
 * dispatch function that can be called to update that substate.
 * @param substateKey The key of the substate to return. The returned dispatch function will be
 * scoped to this substate as well.
 * @returns Object containing the current value of the Substate and a dispatch function that can be
 * called to update it.
 */
export function useSubstate<Type>(substateKey: SubstateKey<Type>): {
  current: Type
  dispatch: Dispatcher<Type>
} {
  const returnVal = useMemo(() => {
    return getSubstate(substateKey)
  }, [substateKey])

  const [, setState] = useState<unknown>()

  useEffect(() => {
    log('Registering listener for ' + substateKey.id)
    registerListener(substateKey, setState)

    return () => {
      log('Unregistering listener for ' + substateKey.id)
      unregisterListener(substateKey, setState)
    }
  }, [substateKey])

  return returnVal
}
