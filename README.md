# Raj
> The best JavaScript framework

```sh
npm install raj
```

[![npm](https://img.shields.io/npm/v/raj.svg)](https://www.npmjs.com/package/raj)
[![Build Status](https://travis-ci.org/andrejewski/raj.svg?branch=master)](https://travis-ci.org/andrejewski/raj)
[![Greenkeeper badge](https://badges.greenkeeper.io/andrejewski/raj.svg)](https://greenkeeper.io/)

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
1. Tie it all together with `program()`

## Documentation
The `raj` package contains a single module `raj/runtime`. This module creates runtimes for every Raj application. The `runtime` module exports a single method `program` which will create a runtime for a "program." These programs have the same interface.

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

*Note: TypeScript is not required for Raj applications. This is hard to read, so I wanted syntax highlighting from a typed language.*

The `runtime` module itself is about 20 lines of JavaScript, which may be easier to understand for those who are not familiar with TypeScript.

## Example
A counter that increments by one every time the user confirms.

```js
import {program} from 'raj/runtime'

// State: Integer - We need a single number to count
// Message: void - We receive one message, increment
// View: void - We use the confirm() pop-up as our "view"

program({
  init: [0],
  update (message, state) {
    return [state + 1]
  },
  view (state, dispatch) {
    const keepCounting = window.confirm(`Count is ${state}. Increment?`)
    if (keepCounting) {
      dispatch()
    }
  }
})
```

Examples exist in the `examples/` folder.

## Ecosystem

##### Raj packages

| Package | Description |
| ------- | ----------- |
| [`raj-compose`](https://github.com/andrejewski/raj-compose) | Program composition. Raj applications assemble from small programs. Common composition patterns are in this package. |
| [`raj-react`](https://github.com/andrejewski/raj-react) | React bindings. Raj is view library agnostic. This package integrates Raj's runtime into the React ecosystem. |
| [`raj-spa`](https://github.com/andrejewski/raj-spa) | Single page applications. Most apps need a way of coordinating navigation and views. This package provides a coordinator which has lazy-loading and code-splitting support. |

##### Recommended non-Raj packages

| Package | Description |
| ------- | ----------- |
| [`tagmeme`](https://github.com/andrejewski/tagmeme) | Tagged union library. The Raj runtime is message driven. Tagmeme is the recommended way to construct messages. It has tagged unions with pattern matching. |

## Roadmap

Raj is small, leaving most complexity to libraries or applications. Right now the Raj ecosystem is `0.0.x` to ensure that no one can get mad as we make changes to the framework.

A Raj `1.0.0` will happen once we iron out all conceptual problems and have built enough real-world applications for us to feel confident in promoting this approach.

[I](https://github.com/andrejewski) created this framework, but don't want others to miss out on contributing to its development or building applications with it. If I find good collaborator(s), we can switch these projects over to a community organization and/or a mono-repo as we build towards a version 1. Please reach out if interested in contributing to or building an application with Raj.
