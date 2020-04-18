import { useState, useEffect } from 'react'

import { GlobalState } from './Interfaces'
import StateManager from './StateManager'

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

export { useSubstate }
