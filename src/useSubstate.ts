import { useState, useEffect } from 'react'

import { GlobalState } from './Substate'
import StateManager from './StateManager'

function useSubstate (sliceKey: keyof GlobalState): Array<object> {
    if (!StateManager.hasSlice(sliceKey)) {
        throw new Error('No slice found with key ' + sliceKey)
    }

    const [, setState] = useState()

    useEffect(() => {
        console.log('Registering listener for ' + sliceKey)
        StateManager.registerListener(sliceKey, setState)

        return () => {
            console.log('Unregistering listener for ' + sliceKey)
            StateManager.unregisterListener(sliceKey, setState)
        }
    }, [sliceKey, setState])

    return [
        StateManager.getSlice(sliceKey),
        StateManager.dispatch
    ]
}

export { useSubstate }
