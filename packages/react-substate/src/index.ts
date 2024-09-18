import {setDebugEnabled} from './Debug.js'
import {useDispatch} from './hooks/useDispatch.js'
import {useGlobalDispatch} from './hooks/useGlobalDispatch.js'
import {usePatchEffect} from './hooks/usePatchEffect.js'
import {useSubstate} from './hooks/useSubstate.js'
import {Dispatcher, GlobalDispatcher} from './Interfaces.js'
import {createAction} from './managers/ActionManager.js'
import {setDevToolsEnabled} from './managers/DevToolsManager.js'
import {createSubstate} from './managers/SubstateManager.js'

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
  useGlobalDispatch,
  usePatchEffect,
  useSubstate
}

export type {
  Dispatcher,
  GlobalDispatcher
}
