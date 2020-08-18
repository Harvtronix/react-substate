import Debug from './Debug'
import useDispatch from './hooks/useDispatch'
import usePatchEffect from './hooks/usePatchEffect'
import useSubstate from './hooks/useSubstate'
import ActionManager from './managers/ActionManager'
import SubstateManager from './managers/SubstateManager'

export default {
    create: SubstateManager.createSubstate,
    createAction: ActionManager.createAction,
    setDebugEnabled: Debug.setDebugEnabled
}

export {useDispatch, usePatchEffect, useSubstate}
