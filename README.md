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
    test: Substate.add('test', {field1: 'the state'}),
    anotherTest: Substate.add('anotherTest', {foo: 'bar'})
}

const actions = {
    onButtonClick: Substate.createAction(
        stateSlices.test,
        (draft, payload) => {
            draft.field1 = payload // "the new state"
        }
    )
}

const Example = () => {
    const [test, dispatch] = useSubstate('test')
    render (
        <button
            onClick={() => (dispatch(actions.onButtonClick, 'the new state')}
        >
            {test.field1}
        </button>
    )
}
```

## License

MIT © [Harvtronix](https://github.com/Harvtronix)
