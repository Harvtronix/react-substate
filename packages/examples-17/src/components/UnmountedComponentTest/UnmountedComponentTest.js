import React, { useState } from 'react'
import { BrowserRouter, Route, useHistory } from 'react-router-dom'

import Pets from './Pets';
import Pet from './Pet';

const WithRouting = () => {
    const [showPets, setShowPets] = useState(true)
    const history = useHistory()

    const toggle = () => {
        setShowPets(state => !state);
        history.goBack()
    };

    return (
        <div>
            <button onClick={toggle}>{showPets ? "hide" : "show"}</button>
            {showPets && <Pets />}
            <Route path='/pet' component={Pet} />
        </div>
    )
}

const UnmountedComponentTest = () => {
    return (
        <BrowserRouter>
            <WithRouting />
        </BrowserRouter>
    )
}

export default UnmountedComponentTest
