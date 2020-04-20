# Substate

> Blazing-fast, centralized state management with auto-guaranteed, immutable state changes

[![NPM Version](https://img.shields.io/badge/package%20name-react--substate-blueviolet)](https://www.npmjs.com/package/react-substate)
[![NPM Version](https://img.shields.io/npm/v/react-substate.svg)](https://www.npmjs.com/package/react-substate)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/react-substate?color=orange)](https://github.com/Harvtronix/react-substate/blob/master/LICENSE)
[![CI](https://github.com/Harvtronix/react-substate/workflows/CI/badge.svg)](https://github.com/Harvtronix/react-substate/actions?query=workflow%3ACI)


## Install

```bash
npm install --save react-substate
```

## Usage

```jsx
import React from 'react'

import Substate, { useSubstate } from 'react-substate'

// Set up some sub-states
const substates = {
    test: Substate.create({field1: 'the state'}),
    anotherTest: Substate.create({foo: 'bar'})
}

// Set up some dispatchable actions
const actions = {
    onButtonClick: Substate.createAction(
        substates.test,
        (draft, payload) => {
            draft.field1 = payload // Will become "the new state"
        }
    )
}

// Use it like you would `useReducer` or `useState`
const App = () => {
    const [test, dispatch] = useSubstate(substates.test)
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
