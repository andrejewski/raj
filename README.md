<h1 align="center">
	<img width="320" src="docs/raj.svg" alt="Raj">
  <br>
  <br>
</h1>

> The Elm Architecture for JavaScript

```sh
npm install raj
```

[![npm](https://img.shields.io/npm/v/raj.svg)](https://www.npmjs.com/package/raj)
[![Build Status](https://travis-ci.org/andrejewski/raj.svg?branch=master)](https://travis-ci.org/andrejewski/raj)
[![Greenkeeper badge](https://badges.greenkeeper.io/andrejewski/raj.svg)](https://greenkeeper.io/)

## Example
A counter that increments by one every time the user confirms.

```js
import { runtime } from 'raj'

runtime({
  init: [0], // State is an integer to count
  update (message, state) {
    return [state + 1] // Increment the state
  },
  view (state, dispatch) {
    const keepCounting = window.confirm(`Count is ${state}. Increment?`)
    if (keepCounting) {
      dispatch()
    }
  }
})
```

*Note:* Raj is view layer agnostic.
Here we use the browser's built-in view to play the part.

## Architecture

The data flow is unidirectional.
The update creates a new state and optionally triggers an effect based on the current state and a received message.
The view is a function of state.
The view and any side-effects communicate by dispatching messages.

Building any app follows the same steps:

1. Define your data model with `init`
1. Define your messages
1. Define your behaviors with `update(message, state)`
1. Define your effects as functions which accept a dispatch function
1. Define your view with `view(state, dispatch)`
1. Tie it all together with `runtime()`

## Documentation
The `raj` package contains a function `runtime`.
This function creates a runtime for a Raj program.
These programs have the same interface.

```ts
interface RajProgram<State, Message, View> {
  init: [
    // initial state
    State,
    // initial effect (optional)
    void | ((dispatch: (message: Message) => void) => void)
  ]
  update (message: Message, state: State): [
    // new state
    State,
    // new effect (optional)
    void | ((dispatch: (message: Message) => void) => void)
  ]
  view (state: State, dispatch: (message: Message) => void): View;
}
```

*Note:* TypeScript is not required for Raj applications.
This is hard to read, so I wanted syntax highlighting from a typed language.
Raj is 34 lines of JavaScript, which may be easier to understand for those who are not familiar with TypeScript.