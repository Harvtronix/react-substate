import SubstateManager from './managers/SubstateManager'
import ActionManager from './managers/ActionManager'

import useSubstate from './hooks/useSubstate'
import usePatchEffect from './hooks/usePatchEffect'

export default {
    create: SubstateManager.createSubstate,
    createAction: ActionManager.createAction
}

export { usePatchEffect, useSubstate }
