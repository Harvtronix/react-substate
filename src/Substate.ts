import StateManager from './StateManager'

interface StateSlice {
    listeners: Array<Function>,
    state: {
        [key: string]: any
    }
}

/* exported GlobalState */
interface GlobalState {
    [key: string]: StateSlice
}

interface Actions {
    [key: number]: ActionEntry
}

interface ActionEntry {
    sliceKey: keyof GlobalState,
    stateModifier: Function
}

type ActionKey = keyof Actions

function add (sliceKey: keyof GlobalState, initialSliceData: object): void {
    if (StateManager.hasSlice(sliceKey)) {
        throw new Error(`Slice key "${sliceKey}" already exists`)
    }

    StateManager.addSlice(sliceKey, initialSliceData)
}

function createAction (
    sliceKey: keyof GlobalState,
    stateModifier: Function
): ActionKey {
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
