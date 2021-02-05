import {setDebugEnabled} from './Debug'
import {useDispatch} from './hooks/useDispatch'
import {usePatchEffect} from './hooks/usePatchEffect'
import {useSubstate} from './hooks/useSubstate'
import {createAction} from './managers/ActionManager'
import {createSubstate} from './managers/SubstateManager'

export default {
    createAction,
    createSubstate,
    setDebugEnabled,

    useDispatch,
    usePatchEffect,
    useSubstate
}

export {
    createAction,
    createSubstate,
    setDebugEnabled,

    useDispatch,
    usePatchEffect,
    useSubstate
}
