import {useEffect, useState} from 'react'

import dispatch from '../dispatch'
import {Substates} from '../Interfaces'
import SubstateManager from '../managers/SubstateManager'

/**
 * Hook that allows a component to listen for changes to a substate and receive a reference to a
 * dispatch function that can be called to update that substate.
 *
 * @param {keyof Substates} substateKey Substate key to attach to.
 * @returns {Array} Array whose `0` index is the current value of the substate and whose `1` index
 * is a dispatch function that can be called to update the substate.
 */
function useSubstate (substateKey: keyof Substates):
    [any, (actionName: number, payload: any) => void] {
    if (!SubstateManager.hasSubstate(substateKey)) {
        throw new Error('No substate found with key ' + substateKey)
    }

    const [, setState] = useState()

    useEffect(() => {
        console.log('Registering listener for ' + substateKey)
        SubstateManager.registerListener(substateKey, setState)

        return () => {
            console.log('Unregistering listener for ' + substateKey)
            SubstateManager.unregisterListener(substateKey, setState)
        }
    }, [substateKey, setState])

    return [
        SubstateManager.getSubstate(substateKey),
        dispatch
    ]
}

export default useSubstate
