import React from 'react'
import message from 'raj/message'
import react from 'raj/react'

export function init () {
  return {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    error: null
  }
}

export const ChangeQuery = message()
export const ReceiveResults = message()
export const ReceiveError = message()
export const Search = message.union([
  ChangeQuery,
  ReceiveError,
  ReceiveResults
])

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

export function fetchResults (query) {
  return function fetchCommand (dispatch) {
    return window.fetch('/my/search/endpoint')
      .then(res => res.json())
      .then(payload => {
        dispatch(ReceiveResults(payload.results))
      })
      .catch(error => {
        dispatch(ReceiveError(error))
      })
  }
}

export function main () {
  return react.program(React, {
    init,
    update,
    view
  })
}
