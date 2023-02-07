interface ActionStateModifier {
  (draft: any, payload: any): any
}

interface Actions {
  [key: number]: ActionStateModifier
}

interface Dispatcher {
  (actionKey: keyof Actions, payload: any): void
}

interface PatchEffectFunction {
  (patches: Array<any>): void
}

interface Substates {
  [key: number]: {
    listeners: Array<Function>
    patchEffects: Array<PatchEffectFunction>
    state: Record<string | number | symbol, any>
  }
}

interface SubstateKey<Type> {
  id: keyof Substates
  retrieve: (substates: Substates) => Type
}

interface DevToolsState {
  [key: number]: {
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
  ActionStateModifier,
  Actions,
  DevTools,
  DevToolsOperation,
  DevToolsState,
  Dispatcher,
  PatchEffectFunction,
  Substates,
  SubstateKey
}
