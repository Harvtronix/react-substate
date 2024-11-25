# React Substate

> Blazing-fast, centralized state management with auto-guaranteed, immutable state changes

[![Package Name](https://img.shields.io/badge/pkg%20name-react--substate-blueviolet)](https://www.npmjs.com/package/react-substate)
[![NPM Version](https://img.shields.io/npm/v/react-substate.svg)](https://www.npmjs.com/package/react-substate)
![Minified and Zipped Size is 5.58 kB](https://img.shields.io/badge/minified%2Bzipped-5.58%20kB-brightgreen)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-orange.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/react-substate?color=orange)](https://github.com/Harvtronix/react-substate/blob/main/LICENSE)
[![CI](https://github.com/Harvtronix/react-substate/workflows/CI/badge.svg)](https://github.com/Harvtronix/react-substate/actions?query=workflow%3ACI)
![Publish to NPM](https://github.com/Harvtronix/react-substate/workflows/Publish%20to%20NPM/badge.svg)

## Install

```bash
npm install react-substate [react react-dom]
```

## Basic Example

```jsx
import { createSubstate, createAction, useSubstate } from 'react-substate'

// Set up some sub-states
const substates = {
  test: createSubstate({ someField: 'the state' }),
  anotherTest: createSubstate(() => ({ foo: 'bar' })) // Use a generator function
}

// Set up some dispatchable Actions to modify state
const actions = {
  updateSomeField: createAction((draft, payload) => {
    draft.someField = payload // Sets `someField` in `draft` to the provided `payload`
  })
}

// Use it!
export const Component = () => {
  const test = useSubstate(substates.test)

  const handleClick = useCallback(() => {
    test.dispatch(actions.updateSomeField, 'the new state') // works
  }, [])

  return <button onClick={handleClick}>{test.current.someField}</button>
}
```

## React Substate supports Redux DevTools

If you have the Redux DevTools extension installed in your browser, you'll be able to see changes driven by Substate creations and Action dispatches as they happen over time. The support is somewhat limited for now, but will only get better with time!

## Migrating from 5.x to 6.x

The 6.0 release includes breaking changes to what `useSubstate` returns, as well as the removal of the Immer "patch" support that was previously exposed via `usePatchEffect`. The `globalDispatch` function has also been renamed to just `dispatch`.

### `useSubstate`

Where you previously had something like:

```jsx
const [test, dispatch] = useSubstate(substates.test)
```

Or as was often the case in larger applications:

```jsx
const [test, dispatchTest] = useSubstate(substates.test)
```

You will instead use the clearer and less error-prone syntax of:

```jsx
const test = useSubstate(substates.test)
```

To get the current value of a substate, use:

```jsx
test.current
```

And to get the Substate-specific dispatch function, use:

```jsx
test.dispatch(...)
```

If you really want to still destructure these into `{current: test, dispatch}` you can, however this is not the recommended approach.

### `useGlobalDispatch`

Where you previously had something like:

```jsx
const globalDispatch = useGlobalDispatch()
```

You will instead use:

```jsx
const dispatch = useDispatch()
```

### `usePatchEffect`

This hook has been removed and there is no planned replacement for it. If you still need its functionality, use v5.x instead.

### TypeScript enhancements

The typing of React Substate is now better ar preventing users from doing the "wrong thing" by carrying forward types from Substate definitions all the way through to Actions verbatim and no longer widening types when additional properties are provided to either drafts or payloads.

# Intro

React Substate boils down to three main parts:

## Substates

This is how you store your application state. You can create new substates wherever you want, but it's often useful to define related groups of them together in the same file.

When you create a substate, what you get back is a "key" which is used later on to refer to the Substate in other functions of the library.

Substates are inexpensive, so you have the freedom to define them based on how you'd like to trigger re-renders within your application.

Few, large Substates will lead to heavier and more frequent re-renders, but can be useful in applications where even the most nested of components require a lot of data, or when the application is sufficiently small.

Many, small Substates generally leads to better-designed applications with fewer re-renders. The disadvantage of this approach is some additional legwork to adequately divide your application state into Substates.

## Actions

Like other action/dispatch-driven frameworks, React Substate requires that state be updated through discrete Actions previously registered with the framework. These Actions can be created/registered at any time, but it is advisable to define them up front and all together in their own file(s).

What sets React Substate apart from other state management libraries is immutability. When working with your state inside of an Action, the object is automatically proxied by [Immer](https://immerjs.github.io/immer/) to ensure that no matter how you manipulate the state inside of the Action, the result is an **immutable** state change. By convention, _Immer_ refers to the proxied state object as a `draft`, and it's always the first parameter available inside of your Action functions.

An Action can be used to update any Substate. You have the flexibility to choose whether to write general-purpose Actions that can apply to multiple different Subsates with similar structures or very specific Actions that only make sense when called against a single Substate. It is often easier to debug an application when the Actions are specific and discrete, but this is not required by the framework. For example, a single, giant Action called `doUpdate` with a bunch of conditionals in it is possible, but most likely not a great idea.

Actions you create can later be passed to a `dispatch` function to cause your Substates to change, and ultimately your components to re-render. `dispatch` takes an `action` and a `payload` as arguments. The payload can be anything you might need to calculate the new state from inside your Action.

## Hooks

React Substate's Hooks are what give you access to your state and changes to that state. A component can use as many `useSubstate` hooks as needed to obtain the data it needs to render.

In addition to giving back the `current` value of a Substate, `useSubstate` returns a `dispatch` function that can be called (with an `action` and `payload`) to update the value of that particular Substate.

Depending on your preference, you can also opt to use the general-purpose `useDispatch` hook instead of dealing with Substate-specific ones. `useDispatch` returns a function which takes three arguments instead of two: A Substate key, an Action key, and a payload. More on this in the examples below.

# Examples

## Basic TypeScript example

```tsx
import { useCallback } from 'react'
import {
  createSubstate,
  createAction,
  useSubstate
} from 'react-substate'

interface Test {
  someField: string
}

const substates = {
  // By default, the type of the Substate will be inferred from the provided argument
  simple: createSubstate({foo: 'bar'})
  // A type hint can be provided to be more specific.
  test: createSubstate<Test>({someField: 'the state'})
}

const actions = {
  updateSomeField: createAction(
    // The Subtate's type can then also be used in the Action that modifies the Substate
    (draft: Test, payload: Test['someField']) => {
      draft.someField = payload // Will become "the new state"
    }
  )
}

export const Component = () => {
  const test = useSubstate(substates.test)

  const handleClick = useCallback(() => {
    test.dispatch(actions.updateSomeField, 'the new state') // works
    // test.dispatch(actions.updateSomeField, 123) <-- error: must pass a string
  }, [])

  return (
    <button onClick={handleClick}>{test.current.someField}</button>
  )
}
```

## Multiple Substates, One Dispatcher

```tsx
import { useCallback } from 'react'
import {
  createSubstate,
  createAction,
  useSubstate,
  useDispatch
} from 'react-substate'

const substates = {
  simple: createSubstate({foo: 'bar'})
  test: createSubstate({someField: 'the state'})
}

const actions = {
  updateFoo: createAction((draft, payload) => {
    draft.foo = payload
  }),
  updateSomeField: createAction(
    (draft, payload) => {
      draft.someField = payload
    }
  )
}

export const Component = () => {
  const simple = useSubstate(substates.simple)
  const test = useSubstate(substates.test)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(substates.simple, actions.updateFoo, 'new foo!')
    dispatch(substates.test, actions.updateSomeField, 'the new state')
  }, [])

  return (
    <button onClick={handleClick}>
      {simple.current.foo} {test.current.someField}
    </button>
  )
}
```

## Replacing the entire Substate value

```tsx
import { useCallback } from 'react'
import { createSubstate, createAction, useSubstate } from 'react-substate'

const substates = {
  test: createSubstate({ someField: 'the state' })
}

const actions = {
  resetTest: createAction((_draft, _payload) => {
    // Just like Immer's `produce`, returning a value replaces the draft entirely
    return {
      someField: 'the brand new state'
    }
  })
}

export const Component = () => {
  const test = useSubstate(substates.test)

  const handleClick = useCallback(() => {
    test.dispatch(actions.resetTest, null)
  }, [])

  return <button onClick={handleClick}>{test.current.someField}</button>
}
```

## Unit testing

```tsx
import { render, screen } from '@testing-library/react'
import { createSubstate } from 'react-substate'

import { substates } from '../substates.js'
import { Component } from '../component.js'

describe('Cool unit tests', () => {
  it('works when given a specific value', () => {
    substates.test = createSubstate({ something: 'very specific' })

    render(<Component />)

    expect(screen.getByRole('button')).toHaveTextContent('very specific')
  })
})
```

# API Reference

## Functions

### `createSubstate`

Creates and registers a new Substate with the given initial data. Returns a "key" for the Substate that can be passed to other functions like `useSubstate` or `dispatch`.

### `createAction`

Registers a new dispatchable Action that modifies a Substate. Returns a "key" for the Action that can be passed to a `dispatch` function.

### `setDebugEnabled`

Turns on/off logging of debug statements to the JavaScript console.

### `setDevToolsEnabled`

Turns on/off logging of Substate changes to the Redux DevTools browser extension.

## Hooks

### `useSubstate`

Hook that allows a component to listen for changes to a Substate and receive a reference to a dispatch function that can be called to update that Substate. The return value is an object of the form `{ current: <obj>, dispatch: <fn> }`.

### `useDispatch`

Hook that returns a reference to a dispatch function that can be called to update any provided Substate without also listening for changes to any Substates.

## Configuration

### `ImmerConfig`

React Substate uses Immer under the covers to ensure state changes happen in an immutable way. Immer is left at its default behavior except for one exception: Auto-freezing is turned off by default to speed up performance.

If you want to turn this back on or configure any other aspects of Immer in your application, you can use the exported functions like so:

```tsx
import { ImmerConfig } from 'react-substate'

ImmerConfig.setAutoFreeze(true)
ImmerConfig.useMapSet(true)

// etc.
```

# Peer Dependencies

This module has peer dependencies on:

- `react` version 16.14 (with hooks support) or higher.
- `react-dom` version 16 or higher.

# License

MIT © [Harvtronix](https://github.com/Harvtronix)
