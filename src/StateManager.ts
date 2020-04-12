import produce from 'immer'

import { GlobalState, Actions, ActionKey } from './Substate'

let actionIdCounter: ActionKey = 0

const globalState: GlobalState = {}
const actions: Actions = {}

function addAction (
    sliceKey: keyof GlobalState,
    stateModifier: Function
): ActionKey {
    const actionId = actionIdCounter++

    actions[actionId] = {
        sliceKey,
        stateModifier
    }

    return actionId
}

function addSlice (sliceKey: keyof GlobalState, initialSliceData: any): void {
    globalState[sliceKey] = {
        listeners: [],
        state: initialSliceData
    }
}

function dispatch (actionName: keyof Actions, payload: any): void {
    const sliceKey = actions[actionName].sliceKey

    const newState = globalState[sliceKey].state = produce(
        globalState[sliceKey].state,
        (draft) => {
            actions[actionName].stateModifier(draft, payload)
        }
    )

    globalState[sliceKey].listeners.forEach(
        (setState) => {
            setState(newState)
        }
    )
}

function getSlice (sliceKey: keyof GlobalState): any {
    return globalState[sliceKey].state
}

function hasSlice (sliceKey: keyof GlobalState): boolean {
    return sliceKey in globalState
}

function registerListener (sliceKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[sliceKey].listeners.push(setStateFunction)
}

function unregisterListener (sliceKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[sliceKey].listeners =
        globalState[sliceKey].listeners.filter((li) => (li !== setStateFunction))
}

export default {
    actions,

    addAction,
    addSlice,
    dispatch,
    hasSlice,
    getSlice,
    registerListener,
    unregisterListener
}
