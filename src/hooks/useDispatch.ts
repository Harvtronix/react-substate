import {useCallback} from 'react'

import {dispatch} from '../dispatch'
import {Dispatcher, Substates} from '../Interfaces'

/**
 * Hook that allows a component to receive a reference to a dispatch function that can be called to
 * update substates without also listening for changes to any substates.
 *
 * @param {keyof Substates} substateKey The substate to be modified by actions dispatched via the
 * returned dispatch function.
 * @returns {Dispatcher} Dispatch function that can be called to update the substate.
 */
export function useDispatch (substateKey: keyof Substates): Dispatcher {
    // Since we are creating a function in this hook, memoize it so it remains the same across
    // re-renders
    const f = useCallback(
        (actionKey, payload) => (
            dispatch(substateKey, actionKey, payload)
        ),
        [substateKey]
    )

    return f
}
