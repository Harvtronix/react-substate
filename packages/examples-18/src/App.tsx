import BasicExample from './components/BasicExample'
import PatchEffectExample from './components/PatchEffectExample'
import ReplaceEntireStateExample from './components/ReplaceEntireStateExample'
import DispatchOnlyExample from './components/DispatchOnlyExample'

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
