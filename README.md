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

Raj applications are structured as programs.

Every program begins with an initial state, which can be anything, and an optional effect.
These are put into an array which is the `init` property of the program.

```js
const init = [initialState, /* optional */ initialEffect]
```

"Effects" are functions which receive a function `dispatch`.
Effects handle asynchronous work like data-fetching, timers, and managing event listeners.
They can pass `dispatch` messages and Raj uses those to update the state.

```js
function effect (dispatch) {
  // do anything or nothing; preferably something asynchronous
  // call dispatch 0, 1, or N times
  dispatch(message)
}
```

A "message" can be anything; a server response, the current time, even `undefined`.

When a message is dispatched, Raj passes that message and the current state to `update`.
The `update` function returns a new state and optional effect.
The business logic of the program is handled with this function.

```js
function update (message, currentState) {
  return [newState, /* optional */ effect]
}
```

The `view` is a special effect that receives both the current state and the `dispatch` function.
The `view` can return anything.
For the React view layer, the `view` returns React elements to be rendered.

```js
function view (currentState, dispatch) {
  // anything, depending on choice of view library
}
```

The `init`, `update`, and `view` form a "program" which is just an object with those properties:

```js
const program = {
  init: [initialState, /* optional */ initialEffect],
  update (message, currentState) {
    return [newState, /* optional */ effect]
  },
  view (currentState, dispatch) {
    // anything, depending on choice of view library
  }
};
```

Building any program follows the same steps:

1. Define the initial state and effect with `init`
1. Define the state transitions and effects with `update(message, state)`
1. Define the view with `view(state, dispatch)`
1. Tie it all together into a `program`

Programs compose, so a parent program might contain child programs.

- The parent's `init` may contain the child's `init`.
- The parent's `update` may call the child's `update` with messages for the child and the child's state.
- The parent's `view` may call the child's `view` with the child's state and `dispatch`.

In this way, programs most often compose into a tree structure.

The root program is passed to Raj's `runtime`.
The runtime calls the program, manages its state, and runs its effects.

```js
import { runtime } from 'raj'
import { program } from './app'

runtime(program)
```

The [Raj by Example](https://github.com/andrejewski/raj-by-example) documentation covers this in greater detail.
