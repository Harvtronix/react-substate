import {enablePatches} from 'immer'

import {log} from '../Debug'
import {
  PatchEffectFunction,
  SubstateKey
} from '../Interfaces'
import {
  patchEffects,
  substates
} from '../Registry'

/**
 * boolean indicator of whether or not patching is currently enabled.
 */
let patchingEnabled = false

/**
 * Callback function for when new patches have been produced as the result of a `dispatch()` call.
 *
 * @param {SubstateKey<?>} substateKey Key pointing to the substate for which patches were
 * produced.
 * @param {Array<any>} patches The patches array, as provided by immer.
 */
function handlePatchesProduced <Type> (substateKey: SubstateKey<Type>, patches: Array<any>): void {
  if (patches.length === 0) {
    return
  }

  // Fire all substate-specific patch effects
  patchEffects.forEach((patchEffectFunction) => {
    patchEffectFunction(patches)
  })

  // Fire all global patch effects
  substates[substateKey.id].patchEffects.forEach((patchEffectFunction) => {
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

  log('Enabling patch support in immer')

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
 * @param {SubstateKey<?>} [substateKey] Optional substate key to scope the registration to a
 * single substate's patches.
 */
function registerPatchEffect <Type> (
  effectFunction: PatchEffectFunction,
  substateKey?: SubstateKey<Type>
): void {
  // Turn on patching
  ensurePatchingEnabled()

  if (substateKey !== undefined) {
    // Substate key was provided. Register with specific substate
    substates[substateKey.id].patchEffects.push(effectFunction)
  } else {
    // Substate key was not provided. Register patch effect globally
    patchEffects.push(effectFunction)
  }
}

/**
 * Unregisters a previously registered patch effect.
 *
 * @param {PatchEffectFunction} effectFunction The function to unregister.
 * @param {SubstateKey<?>} [substateKey] The optional substate under which this effectFunction was
 * registered. If omitted, it is assumed to have been globally registered.
 */
function unregisterPatchEffect <Type> (
  effectFunction: PatchEffectFunction,
  substateKey?: SubstateKey<Type>
): void {
  if (substateKey !== undefined) {
    // Substate key was provided. Unregister from specific substate
    substates[substateKey.id].patchEffects =
            substates[substateKey.id].patchEffects.filter(
              (ef: PatchEffectFunction) => (ef !== effectFunction)
            )
  } else {
    // Substate key was not provided. Unregister globally
    const remainingPatchEffects = patchEffects.filter(
      (ef: PatchEffectFunction) => (ef !== effectFunction)
    )
    // Clear the array and replace with the remaining patch effects
    patchEffects.splice(0, patchEffects.length, ...remainingPatchEffects)
  }
}

export {
  handlePatchesProduced,
  isPatchingEnabled,
  registerPatchEffect,
  unregisterPatchEffect
}
