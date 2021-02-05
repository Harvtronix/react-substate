import {useEffect} from 'react'

import {log} from '../Debug'
import {PatchEffectFunction, Substates} from '../Interfaces'
import {
    registerPatchEffect,
    unregisterPatchEffect
} from '../managers/PatchManager'
import {hasSubstate} from '../managers/SubstateManager'

/**
 * Hook that allows a component to receive patches each time a substate is updated.
 *
 * @param {PatchEffectFunction} effectFunction Function to run each time patches are generated. This
 * function will receive the patches as an argument.
 * @param {keyof Substates} [substateKeys] Optional substate key to limit which patches are passed
 * to this patch effect.
 */
export function usePatchEffect (
    effectFunction: PatchEffectFunction,
    substateKeys?: keyof Substates | Array<keyof Substates>
): void {
    const keyList: Array<keyof Substates> = []

    if (substateKeys !== undefined) {
        if (Array.isArray(substateKeys)) {
            keyList.splice(0, 0, ...substateKeys)
        } else {
            keyList.push(substateKeys)
        }
    }

    keyList.forEach((substateKey) => {
        if (!hasSubstate(substateKey)) {
            throw new Error('No substate found with key ' + substateKey)
        }
    })

    useEffect(() => {
        if (keyList.length === 0) {
            log('Registering global patch effect')

            registerPatchEffect(effectFunction)
        } else {
            // Register the effect function for each key
            keyList.forEach((substateKey) => {
                log('Registering patch effect for ' + substateKey)

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
                    log('Unregistering patch effect for ' + substateKey)

                    unregisterPatchEffect(effectFunction, substateKey)
                })
            }
        }
    }, [effectFunction, substateKeys])
}
