import { Actions, Substates } from './Interfaces.js'

//
// Objects
//

/**
 * Global actions registry for all substates.
 */
const actions: Actions = {}

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
 * @returns A new, unique Action id.
 */
function createActionId(): keyof Actions {
  return String(++actionKeyCounter)
}

/**
 * @returns A new, unique Substate id.
 */
function createSubstateId(): keyof Substates {
  return String(++substateKeyIdCounter)
}

export { actions, createActionId, createSubstateId, substates }
