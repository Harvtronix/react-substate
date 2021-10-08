import { createSubstate } from 'react-substate'

const substates = {
    pets: createSubstate({
        loading: false,
        selectedPet: '',
        petData: null
    })
}

export default substates
