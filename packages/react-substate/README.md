# React Substate

> Blazing-fast, centralized state management with auto-guaranteed, immutable state changes

[![Package Name](https://img.shields.io/badge/pkg%20name-react--substate-blueviolet)](https://www.npmjs.com/package/react-substate)
[![NPM Version](https://img.shields.io/npm/v/react-substate.svg)](https://www.npmjs.com/package/react-substate)
![Minified and Zipped Size is 1.26 kB](https://img.shields.io/badge/minified%2Bzipped-1.26%20kB-brightgreen)
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
import {
  createSubstate,
  createAction,
  useSubstate
} from 'react-substate'

// Set up some sub-states
const substates = {
  test: createSubstate({someField: 'the state'}),
  anotherTest: createSubstate({foo: 'bar'})
}

// Set up some dispatchable actions
const actions = {
  updateSomeField: createAction(
    (draft, payload) => {
      draft.someField = payload // Will become "the new state"
    }
  )
}

// Use it like you would `useReducer` or `useState`
const BasicExample = () => {
  const [test, dispatch] = useSubstate(substates.test)

  return (
    <button
      onClick={() => (dispatch(actions.updateSomeField, 'the new state'))}
    >
      {test.someField}
    </button>
  )
}
```

## 🌟 New! React Substate now supports Redux DevTools
If you have the Redux DevTools extension installed in your browser, you'll be able to see changes driven by substate creations and action dispatches as they happen over time. The support is somewhat limited for now, but will only get better with time!

## Migrating from 3.x to 4.x
The 4.0 release includes breaking changes, but improves the user experience when using the module. It should also be a tiny bit faster because of some clever memoization. Here are the details of the change so you can migrate from v3 to v4.

## Migrating from 4.x to 5.x
The 4.0 release changes two things. The first affects both JS and TS users. The second only affects TS users:
1. Package exports are now defined via the `exports` key in the `package.json` file. In most cases, this will not require any changes to your code. If you do encounter issues, ensure you're not accessing any of the `react-substate` package code via sub-paths. Stick to the named or default exports.
2. TypeScript types are now stricter for the `createAction` function and payloads being provided to `dispatch`ed actions. Two potential typing errors you will encounter when moving to v5 are:
    - `'draft' is of type 'unknown'`
        - To address this issue, provide a type for the first parameter (`draft`) of `createAction`.
    - `'payload' is of type 'unknown'`
        - To address this issue, provide a type for the second parameter (`payload`) of `createAction`.
        - Note that adding a type to the `payload` parameter will require dispatches of the action to adhere to this type.

### Changes
- Reworked `createAction` to not take a substate key as input. The mapping between a substate and a `dispatch` function is now handled when invoking the `useSubstate` or `useDispatch` hooks.
- `Substate.create` is now either `createSubstate` or `Substate.createSubstate`.
- `useDispatch` now creates/returns a memoized, curried function that is automatically linked to to the provided substate.
- `useSubstate` now internally uses `useDispatch` to obtain the dispatch function. This means less overall code and more efficiency.
- All module exports are now exposed to consumers through both the default export and named exports.


# Intro
React Substate boils down to three main parts:

## Substates
This is how you store your application state. You can create new substates wherever you want, but it is recommended to define them all in the same file.

Substates are inexpensive, so you have the freedom to define them based on how you'd like to trigger re-renders within your application.

Few, large substates will lead to heavier and more frequent re-renders, but can be useful in applications where even the most nested of components require a lot of data, or when the application is sufficiently small.

Many, small substates generally leads to better-designed applications with fewer re-renders. The disadvantage of this approach is some additional legwork to adequately divide your application state into substates.

## Actions
Like other action/dispatch-driven frameworks, React Substate requires that state be updated through discrete actions previously registered with the framework. These actions can be created/registered at any time, but it is advisable to define them up front and all together in their own file(s).

What sets React Substate apart from other state management libraries is that every single action you create is automatically passed through *Immer* to ensure that no matter how you manipulate your state from inside your actions, the result is always an **immutable** state change. Plus, *Immer* makes the syntax super clean.

An action can be used to update any substate. You have the flexibility to choose whether to write general-purpose actions that can apply to multiple different subsates (based on their structure) or very specific actions that only make sense when called against a single substate. It is often easier to debug an application when the actions are specific and discrete, but this is not required by the framework. For example, a single, giant action called `doUpdate` with a bunch of conditionals in it is most likely a terrible idea.

Actions you create can later be passed to a `dispatch` function to cause your substates to change, and ultimately your components to re-render. `dispatch` takes an action and a payload as arguments. The payload can be anything you might need to calculate the new state from inside your action.

## Hooks
React Substate's Hooks are what give you access to your state and changes to that state. A component can use as many `useSubstate` hooks as needed to obtain the data it needs to render. Both `useSubstate` and `useDispatch` will give you a reference to the `dispatch` function that can be used to update a particular substate (the one provided as an argument to the hook).

In addition to `useSubstate` and `useDispatch`, there's another hook called `usePatchEffect`. This hook allows you to register to receive every patch generated by *Immer* as your application state changes. Each patch effect can be scoped to one particular substate, many substates, or the entire substate registry.

# Examples

## Patch Effect Example

```jsx
import {
  createSubstate,
  createAction,
  useDispatch,
  usePatchEffect,
  useSubstate
} from 'react-substate'

const substates = {
  test: createSubstate({field1: 'the state'}),
  anotherTest: createSubstate({foo: 'bar'})
}

const actions = {
  test: {
    updateButtonText: createAction(
      (draft, payload) => {
        draft.field1 = payload // Will become "the new state"
      }
    )
  },
  anotherTest: {
    updateOtherButtonText: createAction(
      (draft, payload) => {
        draft.foo = payload // Will become "baz"
      }
    )
  }
}

export const PatchEffectExample = () => {
  const [test, testDispatch] = useSubstate(substates.test)
  const anotherTestDispatch = useDispatch(substates.anotherTest)

  // Create a patch effect for a single substate
  usePatchEffect((patches) => {
    console.log('I am only called when "anotherTest" updates')
    console.log(patches)
  }, substates.anotherTest) // this could be an array of substates, too

  // Create a patch effect for all substates
  usePatchEffect((patches) => {
    console.log('I am called when any substate updates')
    console.log(patches)
  })

  return (
    <>
      <button
        onClick={() => (
          testDispatch(actions.test.updateButtonText, 'the new state')
        )}
      >
        {test.field1}
      </button>

      <button
        onClick={() => (
          anotherTestDispatch(actions.anotherTest.updateOtherButtonText, 'baz')
        )}
      >
        Dispatch action to update "anotherTest"
      </button>
    </>
  )
}
```

## Basic TypeScript example
```tsx
import {
  createSubstate,
  createAction,
  useSubstate
} from 'react-substate'

interface Test {
  someField: string
}

const substates = {
  // By default, the type of the substate will be inferred from the provided argument
  simple: createSubstate({foo: 'bar'})
  // A type hint can be provided to be more specific.
  test: createSubstate<Test>({someField: 'the state'})
}

// Set up some dispatchable actions
const actions = {
  updateSomeField: createAction(
    // The subtate's type can then also be used in the substate modifier function
    (draft: Test, payload: Test['someField']) => {
      draft.someField = payload // Will become "the new state"
    }
  )
}

export const BasicExample = () => {
  const [test, dispatch] = useSubstate(substates.test)

  return (
    <button
      onClick={() => {
        dispatch(actions.updateSomeField, 'the new state') // works
        dispatch(actions.updateSomeField, 123) // error (must pass a string)
      }}
    >
      {test.someField}
    </button>
  )
}
```

# API Reference

## Functions
`createSubstate`
Creates and registers a new substate with the given initial data. Returns an identifier for the substate.

`createAction`
Registers a new dispatchable action to modify a substate. Returns an identifier used later to reference this action when calling dispatch.

`setDebugEnabled`
Turns on/off logging of debug statements to the Javascript console.

`setDevToolsEnabled`
Turns on/off logging of substate changes to the DevTools browser extension.

## Hooks
`useSubstate`
Hook that allows a component to listen for changes to a substate and receive a reference to a dispatch function that can be called to update that substate.

`useDispatch`
Hook that allows a component to receive a reference to a dispatch function that can be called to update a particular substate without also listening for changes to any substates.

`usePatchEffect`
Hook that allows a component to receive patches each time a substate is updated.

# Peer Dependencies
This module has peer dependencies on:
- `react` version 16.14 (with hooks support) or higher.
- `react-dom` version 16 or higher.

# License

MIT © [Harvtronix](https://github.com/Harvtronix)
