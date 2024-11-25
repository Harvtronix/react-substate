import { enableMapSet, enablePatches, setAutoFreeze, setUseStrictShallowCopy } from 'immer'

import { setDebugEnabled } from './Debug.js'
import { useDispatch } from './hooks/useDispatch.js'
import { useSubstate } from './hooks/useSubstate.js'
import { Dispatcher, GenericDispatcher } from './Interfaces.js'
import { createAction } from './managers/ActionManager.js'
import { setDevToolsEnabled } from './managers/DevToolsManager.js'
import { createSubstate } from './managers/SubstateManager.js'

// Pre-configure Immer to opt out of auto-freezing. This can be overridden by downstream users.
setAutoFreeze(false)

/**
 * Functions that allow additional configuration of the underlying Immer engine.
 */
const Immer = {
  enableMapSet,
  enablePatches,
  setAutoFreeze,
  setUseStrictShallowCopy
}

export default {
  createAction,
  createSubstate,
  setDebugEnabled,
  setDevToolsEnabled,
  useDispatch,
  useSubstate,
  Immer
}

export {
  createAction,
  createSubstate,
  Immer,
  setDebugEnabled,
  setDevToolsEnabled,
  useDispatch,
  useSubstate
}

export type { Dispatcher, GenericDispatcher }
