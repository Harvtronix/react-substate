import React from 'react'

import BasicExample from './components/BasicExample'
import PatchEffectExample from './components/PatchEffectExample'
import ReplaceEntireStateExample from './components/ReplaceEntireStateExample'
import UnmountedComponentTest from './components/UnmountedComponentTest/UnmountedComponentTest'
import DispatchOnlyExample from './components/DispatchOnlyExample'
import TypescriptExample from './components/TypescriptExample'

const App = () => {
    return (
        <>
            <div>
                <h1>Basic Example</h1>
                <BasicExample />
            </div>
            <div>
                <h1>Patch Effect Example</h1>
                <PatchEffectExample />
            </div>
            <div>
                <h1>Replacing Entire State Example</h1>
                <ReplaceEntireStateExample />
            </div>
            <div>
                <h1>Unmounted Component Example</h1>
                <UnmountedComponentTest />
            </div>
            <div>
                <h1>Dispatch-Only Example</h1>
                <DispatchOnlyExample />
            </div>
            <div>
                <h1>Typescript Example</h1>
                <TypescriptExample />
            </div>
        </>
    )
}

export default App
