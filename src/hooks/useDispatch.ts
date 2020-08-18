import dispatch from '../dispatch'
import {Dispatcher} from '../Interfaces'

/**
 * Hook that allows a component to receive a reference to a dispatch function that can be called to
 * update substates without also listening for changes to any substates.
 *
 * @returns {Dispatcher} Dispatch function that can be called to update a substate.
 */
function useDispatch (): Dispatcher {
    return dispatch
}

export default useDispatch
