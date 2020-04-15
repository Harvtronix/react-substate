import StateManager from './StateManager'

interface StateSlice {
    listeners: Array<Function>,
    state: {
        [key: string]: any
    }
}

/* exported GlobalState */
interface GlobalState {
    [key: number]: StateSlice
}

interface Actions {
    [key: number]: ActionEntry
}

interface ActionEntry {
    sliceKey: keyof GlobalState,
    stateModifier: Function
}

type ActionKey = keyof Actions

function add (initialSliceData: object): keyof GlobalState {
    const sliceKey = StateManager.addSlice(initialSliceData)

    return sliceKey
}

function createAction (sliceKey: keyof GlobalState, stateModifier: Function): ActionKey {
    const actionId = StateManager.addAction(sliceKey, stateModifier)

    return actionId
}

export default {
    add,
    createAction
}

export type {
    ActionEntry,
    ActionKey,
    Actions,
    GlobalState
}
