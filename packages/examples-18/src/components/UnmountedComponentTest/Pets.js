import { useEffect } from 'react'
import { useSubstate } from 'react-substate'

import substates from './substates'
import actions from './actions'
import { getPet } from './petsdb'
import Pet from './Pet';

const Pets = () => {
    const [pets, dispatch] = useSubstate(substates.pets)

    const onChange = ({ target }) => {
        dispatch(actions.pets.handlePetSelected, target.value);
    };

    useEffect(() => {
        if (pets.selectedPet) {
            dispatch(actions.pets.handleFetchPet);
            getPet(pets.selectedPet).then(data => {
                dispatch(actions.pets.handleFetchPetSuccess, data);
            });
        } else {
            dispatch(actions.pets.handleReset);
        }
    }, [dispatch, pets.selectedPet]);

    return (
        <>
            <div>
                <select value={pets.selectedPet} onChange={onChange}>
                    <option value="">Select a pet</option>
                    <option value="cats">Cats</option>
                    <option value="dogs">Dogs</option>
                </select>
                {pets.loading && <div>Loading...</div>}
                {pets.petData && <Pet {...pets.petData} />}
            </div>
        </>
    );
}

export default Pets
