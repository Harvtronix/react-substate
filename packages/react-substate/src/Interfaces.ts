interface ActionStateModifier<Draft = any, Payload = any> {
  (draft: Draft, payload: Payload): Draft | void
}

interface Actions {
  [key: string]: ActionStateModifier
}

interface ActionKey<Payload> {
  id: keyof Actions
  __payload: () => Payload
}

interface PatchEffectFunction {
  (patches: Array<any>): void
}

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

interface Dispatcher {
  <Payload>(
    actionKey: ActionKey<Payload>,
    payload: ReturnType<typeof actionKey['__payload']>
  ): void
}

interface GlobalDispatcher{
  <Payload>(
    substateKey: SubstateKey<unknown>,
    actionKey: ActionKey<Payload>,
    payload: ReturnType<typeof actionKey['__payload']>
  ): void
}

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
  GlobalDispatcher,
  PatchEffectFunction,
  Substates,
  SubstateKey
}
