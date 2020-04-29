# React Substate

> Blazing-fast, centralized state management with auto-guaranteed, immutable state changes

[![Package Name](https://img.shields.io/badge/pkg%20name-react--substate-blueviolet)](https://www.npmjs.com/package/react-substate)
[![NPM Version](https://img.shields.io/npm/v/react-substate.svg)](https://www.npmjs.com/package/react-substate)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/react-substate?color=orange)](https://github.com/Harvtronix/react-substate/blob/master/LICENSE)
[![CI](https://github.com/Harvtronix/react-substate/workflows/CI/badge.svg)](https://github.com/Harvtronix/react-substate/actions?query=workflow%3ACI)
![Publish to NPM](https://github.com/Harvtronix/react-substate/workflows/Publish%20to%20NPM/badge.svg)


## Install

```bash
npm install --save react-substate
```

## Basic Example

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
    updateButtonText: Substate.createAction(
        substates.test,
        (draft, payload) => {
            draft.field1 = payload // Will become "the new state"
        }
    )
}

// Use it like you would `useReducer` or `useState`
const BasicExample = () => {
    const [test, dispatch] = useSubstate(substates.test)

    return (
        <button
            onClick={() => (dispatch(actions.updateButtonText, 'the new state'))}
        >
            {test.field1}
        </button>
    )
}

export default BasicExample
```

# Intro
Substate boils down to three main parts:

## Substates
This is how you store your application state. You can create new substates wherever you want, but it is recommended to define them all in the same file.

Substates are inexpensive, so you have the freedom to define them based on how you'd like to trigger re-renders within your application.

Few, large substates will lead to heavier and more frequent re-renders, but can be useful in applications where even the most nested of components require a lot of data, or when the application is sufficiently small.

Many, small substates generally leads to better-designed applications with fewer re-renders. The disadvantage of this approach is some additional legwork to adequately divide your application state into substates.

## Actions
Like other action/dispatch-driven frameworks, Substate requires that state be updated through discrete actions previously registered with the framework. These actions can be created/registered at any time, but it is advisable to define them up front and all together in their own file(s).

What sets Substate apart from other state management libraries is that every single action you create is automatically passed through *Immer* to ensure that no matter how you manipulate your state from inside your actions, the result is always an **immutable** state change. Plus, *Immer* makes the syntax super clean.

An action applies to one and only one substate. It is bound to the substate whose key it provided as an argument to the `createAction` function. This cannot be altered once it is bound, however many actions can be bound to a single substate.

Actions you create can later be passed to the `dispatch` function to cause your substates to change, and ultimately your components to re-render. `dispatch` takes an action and a payload as arguments. The payload can be anything you might need to calculate the new state from inside your action.

## Hooks
Substate's React Hooks are what give you access to your state and changes to that state. A component can use as many `useSubstate` Hooks as needed to obtain the data it needs to render. Also, calling `useSubstate` is what gives you a reference to the `dispatch` function for a particular substate.

In addition to the `useSubstate` hook, there's another hook called `usePatchEffect`. This hook allows you to register to receive every patch generated by *Immer* as your application state changes. Each patch effect can be scoped to either one particular substate, or the entire substate registry.

# Examples

## Patch Effect Example
```jsx
import React from 'react'

import Substate, { usePatchEffect, useSubstate } from 'react-substate'

const substates = {
    test: Substate.create({field1: 'the state'}),
    anotherTest: Substate.create({foo: 'bar'})
}

const actions = {
    updateButtonText: Substate.createAction(
        substates.test,
        (draft, payload) => {
            draft.field1 = payload // Will become "the new state"
        }
    ),
    updateOtherButtonText: Substate.createAction(
        substates.anotherTest,
        (draft, payload) => {
            draft.foo = payload // Will become "baz"
        }
    )
}

const PatchEffectExample = () => {
    const [test, dispatch] = useSubstate(substates.test)

    // Create a patch effect for a single substate
    usePatchEffect((patches) => {
        console.log('I am only called when "anotherTest" updates')
        console.log(patches)
    }, substates.anotherTest)

    // Create a patch effect for all substates
    usePatchEffect((patches) => {
        console.log('I am called when any substate updates')
        console.log(patches)
    })

    return (
        <>
            <button
                onClick={() => (dispatch(actions.updateButtonText, 'the new state'))}
            >
                {test.field1}
            </button>

            <button
                onClick={() => (dispatch(actions.updateOtherButtonText, 'baz'))}
            >
                Dispatch action to update "anotherTest"
            </button>
        </>
    )
}

export default PatchEffectExample
```

# Peer Dependencies
This module has peer dependencies on `react`, `react-dom`, and `immer`.

# License

MIT © [Harvtronix](https://github.com/Harvtronix)
