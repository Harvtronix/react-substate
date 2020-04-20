import StateManager from './StateManager'
import useSubstate from './useSubstate'

export default {
    create: StateManager.createSubstate,
    createAction: StateManager.createAction
}

export { useSubstate }
