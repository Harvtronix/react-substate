import produce from 'immer'

import {
    GlobalState,
    Actions,
    ActionKey
} from './Interfaces'

let actionIdCounter: ActionKey = 0
let substateKeyCounter: keyof GlobalState = 0

const globalState: GlobalState = {}
const actions: Actions = {}

function createAction (substateKey: keyof GlobalState, stateModifier: Function): ActionKey {
    if (!hasSubstate(substateKey)) {
        throw new Error(`Substate key ${substateKey} not registered`)
    }

    const actionId = actionIdCounter++

    actions[actionId] = {
        substateKey,
        stateModifier
    }

    return actionId
}

function createSubstate (initialData: any): keyof GlobalState {
    const substateKey = substateKeyCounter++

    globalState[substateKey] = {
        listeners: [],
        state: initialData
    }

    return substateKey
}

function dispatch (actionName: keyof Actions, payload: any): void {
    const substateKey = actions[actionName].substateKey

    const newState = globalState[substateKey].state = produce(
        globalState[substateKey].state,
        (draft) => {
            actions[actionName].stateModifier(draft, payload)
        }
    )

    globalState[substateKey].listeners.forEach(
        (setState) => {
            setState(newState)
        }
    )
}

function getSubstate (substateKey: keyof GlobalState): any {
    return globalState[substateKey].state
}

function hasSubstate (substateKey: keyof GlobalState): boolean {
    return substateKey in globalState
}

function registerListener (substateKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[substateKey].listeners.push(setStateFunction)
}

function unregisterListener (substateKey: keyof GlobalState, setStateFunction: Function): void {
    globalState[substateKey].listeners =
        globalState[substateKey].listeners.filter((li) => (li !== setStateFunction))
}

export default {
    createAction,
    createSubstate,
    dispatch,
    hasSubstate,
    getSubstate,
    registerListener,
    unregisterListener
}
