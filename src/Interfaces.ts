interface ActionStateModifier {
    (draft: any, payload: any): any
}

interface ActionEntry {
    substateKey: keyof Substates,
    stateModifier: ActionStateModifier
}

interface Actions {
    [key: number]: ActionEntry
}

interface Substates {
    [key: number]: Substate
}

interface PatchEffectFunction {
    (patches: any[]): void
}

interface Substate {
    listeners: Function[],
    patchEffects: PatchEffectFunction[],
    state: {
        [key: string]: any
    }
}

type ActionKey = keyof Actions

export type {
    ActionStateModifier,
    ActionEntry,
    ActionKey,
    Actions,
    Substates,
    PatchEffectFunction
}
