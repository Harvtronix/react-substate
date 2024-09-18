import BasicExample from './components/BasicExample.js'
import PatchEffectExample from './components/PatchEffectExample.js'
import ReplaceEntireStateExample from './components/ReplaceEntireStateExample.js'
import DispatchOnlyExample from './components/DispatchOnlyExample.js'

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
                <h1>Dispatch-Only Example</h1>
                <DispatchOnlyExample />
            </div>
        </>
    )
}

export default App
