# Raj

> The best JavaScript framework

```sh
npm install raj
```

[![npm](https://img.shields.io/npm/v/raj.svg)](https://www.npmjs.com/package/raj)
[![Build Status](https://travis-ci.org/andrejewski/raj.svg?branch=master)](https://travis-ci.org/andrejewski/raj)

## Documentation

- `raj/message`: define message and message unions
  - `message([displayName])`: create a message
  - `message.union([displayName, ] messages)`: create a message union
- `raj/react`: React bindings
  - `program(React, {init, update, view, flags})`: create a React component using the provided options
    - `init(flags, props)`: create the initial state
    - `update(state, message)`: return the new state and optional command
    - `view(state, dispatch)`: return the React view
    - `flags`: optional argument to `init`

## Architecture

The data flow is unidirectional.
The update creates a new state and optionally triggers an effect based on the current state and a received message.
The view is a function of state.
The view and any side-effects communicate by dispatching messages.

Building any app follows the same steps:

1. Define your data model with `init(flags)`
1. Define your messages with `message/message.union`
1. Define your behaviors with `update(state, msg)`
1. Define your effects as functions which accept a dispatch function
1. Define your view with `view(state, dispatch)`
1. Tie it all together as `main()`

## Examples

- `examples/search`: Dummy search widget where a query updates a list of search results.
- `examples/make-n-model`: Dummy loader where a selected make loads a list of relevant models.
