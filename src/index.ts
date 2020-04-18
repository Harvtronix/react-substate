import StateManager from './StateManager'

//
// Default export object
//
export default {
    create: StateManager.createSubstate,
    createAction: StateManager.createAction
}

//
// Named exports
//
export { useSubstate } from './useSubstate'
