import { createAction } from 'react-substate'

const actions = {
    pets: {
        handlePetSelected: createAction(
            (draft, payload) => {
                draft.selectedPet = payload
            }
        ),
        handleFetchPet: createAction(
            (draft, payload) => {
                draft.loading = true
                draft.petData = null
            }
        ),
        handleFetchPetSuccess: createAction(
            (draft, payload) => {
                draft.loading = false
                draft.petData = payload
            }
        ),
        handleReset: createAction(
            (draft, payload) => {
                return {
                    loading: false,
                    selectedPet: '',
                    petData: null
                }
            }
        )
    }
}

export default actions
