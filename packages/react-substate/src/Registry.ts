import {
  Actions,
  PatchEffectFunction,
  Substates
} from './Interfaces.js'

//
// Objects
//

/**
 * Global actions registry for all substates.
 */
const actions: Actions = {}

/**
 * Global registry of all patch effects.
 */
const patchEffects: Array<PatchEffectFunction> = []

/**
 * Global registry of all substates.
 */
const substates: Substates = {}

//
// Keys
//

/**
 * An ever-increasing index assigned to each action created by calling `createAction()`.
 */
let actionKeyCounter = 0

/**
 * An ever-increasing index assigned to each substate created by calling `create()`.
 */
let substateKeyIdCounter = 0

//
// Functions
//

/**
 * @returns {keyof Actions} A new, unique action key.
 */
function createActionKey (): keyof Actions {
  return String(++actionKeyCounter)
}

/**
 * @returns {keyof Substates} A new, unique substate key.
 */
function createSubstateKeyId (): keyof Substates {
  return String(++substateKeyIdCounter)
}

export {
  actions,
  patchEffects,
  substates,

  createActionKey,
  createSubstateKeyId
}
