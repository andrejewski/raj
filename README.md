# Raj
> The best JavaScript framework

```sh
npm install raj
```

[![npm](https://img.shields.io/npm/v/raj.svg)](https://www.npmjs.com/package/raj)
[![Build Status](https://travis-ci.org/andrejewski/raj.svg?branch=master)](https://travis-ci.org/andrejewski/raj)
[![Greenkeeper badge](https://badges.greenkeeper.io/andrejewski/raj.svg)](https://greenkeeper.io/)

## Documentation

- `raj/effect`: group and transform effects
  - `effect.map(mapper, effect)`: transforms the dispatched values of `effect` using the function `mapper`
  - `effect.batch(effects)`: group an array of effects into a single effect
- `raj/runtime`: create generic runtimes
  - `program({init, update, view})`
    - `init`: the initial state and optional effect
    - `update(message, state)`: return the new state and optional effect
    - `view(state, dispatch)`: use the state and dispatch messages

#### Integrations
- `raj/react`: React bindings
  - `program(Component, props => ({init, update, view}))`: create a React program
    - `Component`: a React Component class
    - `props`: the React component `props`
    - `init`: the initial state and optional effect
    - `update(message, state)`: return the new state and optional effect
    - `view(state, dispatch)`: return the React view

## Architecture

The data flow is unidirectional.
The update creates a new state and optionally triggers an effect based on the current state and a received message.
The view is a function of state.
The view and any side-effects communicate by dispatching messages.

Building any app follows the same steps:

1. Define your data model with `init`
1. Define your messages with something like [`tagmeme`](https://github.com/andrejewski/tagmeme)
1. Define your behaviors with `update(message, state)`
1. Define your effects as functions which accept a dispatch function
1. Define your view with `view(state, dispatch)`
1. Tie it all together with `program()`

## Examples

- `examples/search`: Dummy search widget where a query updates a list of search results.
- `examples/make-n-model`: Dummy loader where a selected make loads a list of relevant models.
