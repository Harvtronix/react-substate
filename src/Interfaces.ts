interface ActionStateModifier {
    (draft: any, payload: any): any
}

interface Actions {
    [key: number]: ActionStateModifier
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

interface Substates {
    [key: number]: Substate
}

interface Dispatcher {
    (actionKey: keyof Actions, payload: any): void;
}

export type {
    ActionStateModifier,
    Actions,
    Dispatcher,
    Substates,
    PatchEffectFunction
}
