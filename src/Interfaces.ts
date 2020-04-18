interface Substate {
    listeners: Array<Function>,
    state: {
        [key: string]: any
    }
}

interface GlobalState {
    [key: number]: Substate
}

interface Actions {
    [key: number]: ActionEntry
}

interface ActionEntry {
    substateKey: keyof GlobalState,
    stateModifier: Function
}

type ActionKey = keyof Actions

export type {
    ActionEntry,
    ActionKey,
    Actions,
    GlobalState
}
