import React from 'react'
import { useSubstate } from 'react-substate'
import substates from './substates'

const Pet = (props) => {
    const [pets] = useSubstate(substates.pets)

    return (
        <div>
            <div>{props.name}</div>
            <div>{props.voice}</div>
            <div>{props.avatar}</div>
            <div>{pets.selectedPet}</div>
        </div>
    )
}

export default Pet
