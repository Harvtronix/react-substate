import {useEffect, useState} from 'react'

import {log} from '../Debug'
import {Dispatcher, SubstateKey} from '../Interfaces'
import {
  getSubstate,
  hasSubstate,
  registerListener,
  unregisterListener
} from '../managers/SubstateManager'
import {useDispatch} from './useDispatch'

/**
 * Hook that allows a component to listen for changes to a substate and receive a reference to a
 * dispatch function that can be called to update that substate.
 *
 * @param {SubstateKey<*>} substateKey The key of the substate to return. The returned dispatch
 * function will be scoped to this substate as well.
 * @returns {Array} Array whose `0` index is the current value of the substate and whose `1` index
 * is a dispatch function that can be called to update the substate.
 */
export function useSubstate <Type> (substateKey: SubstateKey<Type>): [Type, Dispatcher] {
  if (!hasSubstate(substateKey)) {
    throw new Error('No substate found with key ' + substateKey)
  }

  const dispatch = useDispatch(substateKey)

  const [, setState] = useState()

  useEffect(() => {
    log('Registering listener for ' + substateKey.id)
    registerListener(substateKey, setState)

    return () => {
      log('Unregistering listener for ' + substateKey.id)
      unregisterListener(substateKey, setState)
    }
  }, [substateKey, setState])

  return [
    getSubstate(substateKey),
    dispatch
  ]
}
