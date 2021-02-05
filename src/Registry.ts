import {
    Actions,
    PatchEffectFunction,
    Substates
} from './Interfaces'

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
const patchEffects: PatchEffectFunction[] = []

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
let actionKeyCounter: keyof Actions = 0

/**
 * An ever-increasing index assigned to each substate created by calling `create()`.
 */
let substateKeyCounter: keyof Substates = 0

//
// Functions
//

/**
 * @returns {keyof Actions} A new, unique action key.
 */
function createActionKey (): keyof Actions {
    return actionKeyCounter++
}

/**
 * @returns {keyof Substates} A new, unique substate key.
 */
function createSubstateKey (): keyof Substates {
    return substateKeyCounter++
}

export {
    actions,
    patchEffects,
    substates,

    createActionKey,
    createSubstateKey
}
