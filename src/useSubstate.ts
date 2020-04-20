import { useState, useEffect } from 'react'

import { GlobalState } from './Interfaces'
import StateManager from './StateManager'

/**
 * Hook that allows a component to listen for changes to a substate and receive a reference to a
 * dispatch function that can be called to update that substate.
 *
 * @param {keyof GlobalState} substateKey Substate key to attach to.
 * @returns {Array} Array whose `0` index is the current value of the substate and whose `1` index
 * is a dispatch function that can be called to update the substate.
 */
function useSubstate (substateKey: keyof GlobalState): Array<object> {
    if (!StateManager.hasSubstate(substateKey)) {
        throw new Error('No substate found with key ' + substateKey)
    }

    const [, setState] = useState()

    useEffect(() => {
        console.log('Registering listener for ' + substateKey)
        StateManager.registerListener(substateKey, setState)

        return () => {
            console.log('Unregistering listener for ' + substateKey)
            StateManager.unregisterListener(substateKey, setState)
        }
    }, [substateKey, setState])

    return [
        StateManager.getSubstate(substateKey),
        StateManager.dispatch
    ]
}

export default useSubstate
