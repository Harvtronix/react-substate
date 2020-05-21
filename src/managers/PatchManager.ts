import {enablePatches} from 'immer'

import {
    PatchEffectFunction,
    Substates
} from '../Interfaces'
import Registry from '../Registry'

/**
 * boolean indicator of whether or not patching is currently enabled.
 */
let patchingEnabled = false

/**
 * Callback function for when new patches have been produced as the result of a `dispatch()` call.
 *
 * @param {keyof Substates} substateKey Key pointing to the substate for which patches were
 * produced.
 * @param {any[]} patches The patches array, as provided by immer.
 */
function handlePatchesProduced (substateKey: keyof Substates, patches: any[]): void {
    if (patches.length === 0) {
        return
    }

    // Fire all substate-specific patch effects
    Registry.patchEffects.forEach((patchEffectFunction) => {
        patchEffectFunction(patches)
    })

    // Fire all global patch effects
    Registry.substates[substateKey].patchEffects.forEach((patchEffectFunction) => {
        patchEffectFunction(patches)
    })
}

/**
 * Ensures that patching support within immer is enabled. Patching is turned on the first time a new
 * patch effect is registered.
 */
function ensurePatchingEnabled (): void {
    if (patchingEnabled) {
        return
    }

    console.log('Enabling patch support in immer')

    enablePatches()
    patchingEnabled = true
}

/**
 * @returns {boolean} Whether or not immer patching has been enabled.
 */
function isPatchingEnabled (): boolean {
    return patchingEnabled
}

/**
 * Registers the provided function to be called when changes to the provided substate (referenced by
 * `substateKey`) are produced. If no substate key is provided, the function will be registered to
 * receive patches produced for all registered substates.
 *
 * @param {PatchEffectFunction} effectFunction Function to call upon receiving new patches.
 * @param {keyof Substates} [substateKey] Optional substate key to scope the registration to a
 * single substate's patches.
 */
function registerPatchEffect (
    effectFunction: PatchEffectFunction,
    substateKey?: keyof Substates
): void {
    // Turn on patching
    ensurePatchingEnabled()

    if (substateKey !== undefined) {
        // Substate key was provided. Register with specific substate
        Registry.substates[substateKey].patchEffects.push(effectFunction)
    } else {
        // Substate key was not provided. Register patch effect globally
        Registry.patchEffects.push(effectFunction)
    }
}

/**
 * Unregisters a previously registered patch effect.
 *
 * @param {PatchEffectFunction} effectFunction The function to unregister.
 * @param {keyof Substates} [substateKey] The optional substate under which this effectFunction was
 * registered. If omitted, it is assumed to have been globally registered.
 */
function unregisterPatchEffect (
    effectFunction: PatchEffectFunction,
    substateKey?: keyof Substates
): void {
    if (substateKey !== undefined) {
        // Substate key was provided. Unregister from specific substate
        Registry.substates[substateKey].patchEffects =
            Registry.substates[substateKey].patchEffects.filter(
                (ef: PatchEffectFunction) => (ef !== effectFunction)
            )
    } else {
        // Substate key was not provided. Unregister globally
        Registry.patchEffects = Registry.patchEffects.filter(
            (ef: PatchEffectFunction) => (ef !== effectFunction)
        )
    }
}

export default {
    handlePatchesProduced,
    isPatchingEnabled,
    registerPatchEffect,
    unregisterPatchEffect
}
