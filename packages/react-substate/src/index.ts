import {setDebugEnabled} from './Debug'
import {useDispatch} from './hooks/useDispatch'
import {usePatchEffect} from './hooks/usePatchEffect'
import {useSubstate} from './hooks/useSubstate'
import {createAction} from './managers/ActionManager'
import {setDevToolsEnabled} from './managers/DevToolsManager'
import {createSubstate} from './managers/SubstateManager'

export default {
  createAction,
  createSubstate,
  setDebugEnabled,
  setDevToolsEnabled,

  useDispatch,
  usePatchEffect,
  useSubstate
}

export {
  createAction,
  createSubstate,
  setDebugEnabled,
  setDevToolsEnabled,

  useDispatch,
  usePatchEffect,
  useSubstate
}
