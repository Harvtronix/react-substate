import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import Pets from './Pets';
import Pet from './Pet';

const WithRouting = () => {
    const [showPets, setShowPets] = useState(true)
    const nav = useNavigate()

    const toggle = () => {
        setShowPets(state => !state);
        nav(-1)
    };

    return (
        <div>
            <button onClick={toggle}>{showPets ? "hide" : "show"}</button>
            {showPets && <Pets />}
            <Routes>
                <Route path='/pet' component={Pet} />
            </Routes>
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
