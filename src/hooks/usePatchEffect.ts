import {useEffect} from 'react'

import Debug from '../Debug'
import {PatchEffectFunction, Substates} from '../Interfaces'
import PatchManager from '../managers/PatchManager'
import SubstateManager from '../managers/SubstateManager'

/**
 * Hook that allows a component to receive patches each time a substate is updated.
 *
 * @param {PatchEffectFunction} effectFunction Function to run each time patches are generated. This
 * function will receive the patches as an argument.
 * @param {keyof Substates} [substateKey] Optional substate key to limit which patches are passed
 * to this patch effect.
 */
function usePatchEffect (
    effectFunction: PatchEffectFunction,
    substateKey?: keyof Substates
): void {
    if (substateKey !== undefined && !SubstateManager.hasSubstate(substateKey)) {
        throw new Error('No substate found with key ' + substateKey)
    }

    useEffect(() => {
        if (substateKey !== undefined) {
            Debug.log('Registering patch effect for ' + substateKey)
        } else {
            Debug.log('Registering global patch effect')
        }

        PatchManager.registerPatchEffect(effectFunction, substateKey)

        return () => {
            if (substateKey !== undefined) {
                Debug.log('Unregistering patch effect for ' + substateKey)
            } else {
                Debug.log('Unregistering global patch effect')
            }

            PatchManager.unregisterPatchEffect(effectFunction, substateKey)
        }
    }, [effectFunction, substateKey])
}

export default usePatchEffect
