type ActionStateModifier<Draft = any, Payload = any> =
  (draft: Draft, payload: Payload) => Draft | void

interface Actions {
  [key: string]: ActionStateModifier
}

interface ActionKey<Payload> {
  id: keyof Actions
  __payload: () => Payload
}

type PatchEffectFunction = (patches: Array<any>) => void

interface Substates {
  [key: string]: {
    listeners: Array<Function>
    patchEffects: Array<PatchEffectFunction>
    state: unknown
  }
}

interface SubstateKey<Type> {
  id: keyof Substates
  __type: () => Type
}

type Dispatcher =
  <Key extends ActionKey<unknown>>(
    actionKey: Key,
    payload: ReturnType<Key['__payload']>
  ) => void

type GenericDispatcher =
  <SKey extends SubstateKey<unknown>, AKey extends ActionKey<unknown>>(
    substateKey: SKey,
    actionKey: AKey,
    payload: ReturnType<AKey['__payload']>
  ) => void

interface DevToolsState {
  [key: string]: {
    listeners: number,
    patchEffects: number,
    state: Substates[any]['state']
  }
}

interface DevTools {
  subscribe: (listener: () => () => void) => any
  unsubscribe: () => void
  send: (action: string, state: DevToolsState) => void
  init: (state: DevToolsState) => void
  error: (message: string) => void
}

type DevToolsOperation =
  'Create Substate' |
  'Dispatch'

export type {
  ActionKey,
  ActionStateModifier,
  Actions,
  DevTools,
  DevToolsOperation,
  DevToolsState,
  Dispatcher,
  GenericDispatcher,
  PatchEffectFunction,
  Substates,
  SubstateKey
}
