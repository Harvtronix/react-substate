import { useEffect, useMemo } from 'react'

import { log } from '../Debug.js'
import { PatchEffectFunction, SubstateKey } from '../Interfaces.js'
import { registerPatchEffect, unregisterPatchEffect } from '../managers/PatchManager.js'

/**
 * Hook that allows a component to receive patches each time a substate is updated.
 * @param effectFunction Function to run each time patches are generated. This
 * function will receive the patches as an argument.
 * @param [substateKeys] Optional substate key to limit which
 * patches are passed to this patch effect.
 */
export function usePatchEffect(
  effectFunction: PatchEffectFunction,
  substateKeys?: SubstateKey<unknown> | Array<SubstateKey<unknown>>
): void {
  const keyList: Array<SubstateKey<unknown>> = useMemo(() => {
    const list: Array<SubstateKey<unknown>> = []

    if (substateKeys !== undefined) {
      if (Array.isArray(substateKeys)) {
        keyList.splice(0, 0, ...substateKeys)
      } else {
        keyList.push(substateKeys)
      }
    }

    return list
  }, [substateKeys])

  useEffect(() => {
    if (keyList.length === 0) {
      log('Registering global patch effect')

      registerPatchEffect(effectFunction)
    } else {
      // Register the effect function for each key
      keyList.forEach((substateKey) => {
        log('Registering patch effect for ' + substateKey.id)

        registerPatchEffect(effectFunction, substateKey)
      })
    }

    return () => {
      if (keyList.length === 0) {
        log('Unregistering global patch effect')

        unregisterPatchEffect(effectFunction)
      } else {
        // Unregister the effect function for each key
        keyList.forEach((substateKey) => {
          log('Unregistering patch effect for ' + substateKey.id)

          unregisterPatchEffect(effectFunction, substateKey)
        })
      }
    }
  }, [effectFunction, keyList])
}
