interface Substate<Type> {
  listeners: Array<(...args: unknown[]) => void>
  current: Type
  dispatch: Dispatcher<Type>
}

type Substates = Record<string, Substate<unknown>>

interface SubstateKey<Type> {
  id: keyof Substates
  __type: Type
}

type Action<Draft, Payload> = (draft: Draft, payload: Payload) => Draft | void

type Actions = Record<string, Action<unknown, unknown>>

interface ActionKey<Draft, Payload> {
  id: keyof Actions
  __draft: Draft
  __payload: Payload
}

type Dispatcher<Type> = <
  ActionDraft extends Type,
  ActionPayload,
  ProvidedPayload extends ActionPayload
>(
  actionKey: ActionKey<ActionDraft, ActionPayload>,
  payload: ProvidedPayload
) => void

type GenericDispatcher = <
  SubstateType,
  ActionDraft extends SubstateType,
  ActionPayload,
  ProvidedPayload extends ActionPayload
>(
  substateKey: SubstateKey<SubstateType>,
  actionKey: ActionKey<ActionDraft, ActionPayload>,
  payload: ProvidedPayload
) => void

interface DevToolsState {
  [key: string]: {
    listeners: number
    current: unknown
  }
}

interface DevTools {
  subscribe: (listener: () => () => void) => void
  unsubscribe: () => void
  send: (action: string, state: DevToolsState) => void
  init: (state: DevToolsState) => void
  error: (message: string) => void
}

type DevToolsOperation = 'Create Substate' | 'Dispatch'

export type {
  Action,
  ActionKey,
  Actions,
  DevTools,
  DevToolsOperation,
  DevToolsState,
  Dispatcher,
  GenericDispatcher,
  Substate,
  SubstateKey,
  Substates
}
