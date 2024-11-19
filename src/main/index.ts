import { setDebugEnabled } from './Debug.js'
import { useDispatch } from './hooks/useDispatch.js'
import { useSubstate } from './hooks/useSubstate.js'
import { Dispatcher, GenericDispatcher } from './Interfaces.js'
import { createAction } from './managers/ActionManager.js'
import { setDevToolsEnabled } from './managers/DevToolsManager.js'
import { createSubstate } from './managers/SubstateManager.js'

export default {
  createAction,
  createSubstate,
  setDebugEnabled,
  setDevToolsEnabled,

  useDispatch,
  useSubstate
}

export {
  createAction,
  createSubstate,
  setDebugEnabled,
  setDevToolsEnabled,
  useDispatch,
  useSubstate
}

export type { Dispatcher, GenericDispatcher }
