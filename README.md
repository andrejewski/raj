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

## Example

```js
// Search.js
import React from 'react'
import message from 'raj/message'
import react from 'raj/react'

// model
export function init () {
  return {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    error: null
  }
}

// messages
export const ChangeQuery = message()
export const ReceiveResults = message()
export const ReceiveError = message()
export const Search = message.union([
  ChangeQuery,
  ReceiveError,
  ReceiveResults
])

// update
export function update (state, message) {
  return Search.match(message, [
    ChangeQuery, query => [{
      ...state,
      searchQuery: query,
      isLoading: true
    }, fetchResults(query)],
    ReceiveResults, results => ({
      ...state,
      searchResults: results,
      isLoading: false,
      error: null
    }),
    ReceiveError, error => ({
      ...state,
      error,
      isLoading: false
    })
  ])
}

// view
export function view (state, dispatch) {
  return <div>
    <InputView
      text={state.searchQuery}
      onChange={newQuery =>
        dispatch(ChangeQuery(newQuery))
      } />
    <ul>
      {state.results.map(result =>
        <li key={result}>{result}</li>
      )}
    </ul>
  </div>
}

export function InputView ({text, onChange}) {
  const inputProps = {
    text,
    onInput: event => {
      onChange(event.target.value)
    }
  }
  return <input {...inputProps} />
}

// effects
export function fetchResults (query) {
  return function fetchCommand (dispatch) {
    return fetch('/my/search/endpoint')
      .then(res => res.json())
      .then(payload => {
        dispatch(ReceiveResults(payload.results))
      })
      .catch(error => {
        dispatch(ReceiveError(error))
      })
  }
}

// assemble
export function main () {
  return react.program(React, {
    init,
    update,
    view
  })
}
```
