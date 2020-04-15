# react-substate

> Blazing-fast, centralized state management with auto-guaranteed, immutable state changes

[![NPM](https://img.shields.io/npm/v/react-substate.svg)](https://www.npmjs.com/package/react-substate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-substate
```

## Usage

```jsx
import React from 'react'

import Substate, { useSubstate } from 'react-substate'

// Set up some state slices
const stateSlices = {
    test: Substate.add({field1: 'the state'}),
    anotherTest: Substate.add({foo: 'bar'})
}

// Set up some dispatchable actions
const actions = {
    onButtonClick: Substate.createAction(
        stateSlices.test,
        (draft, payload) => {
            draft.field1 = payload // Will become "the new state"
        }
    )
}

// Use it like you would `useDispatch` or `useState`
const App = () => {
    const [test, dispatch] = useSubstate(stateSlices.test)
    return (
        <button
            onClick={() => (dispatch(actions.onButtonClick, 'the new state'))}
        >
        {test.field1}
        </button>
    )
}

export default App

```

## Peer Dependencies
This module has peer dependencies on `react`, `react-dom`, and `immer`.

## License

MIT © [Harvtronix](https://github.com/Harvtronix)
