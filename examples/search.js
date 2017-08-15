import React from 'react'
import react from 'raj/react'
import tag from 'tagmeme'

export const init = [{
  searchQuery: '',
  searchResults: [],
  isLoading: false,
  error: null
}]

export const ChangeQuery = tag()
export const ReceiveResults = tag()
export const ReceiveError = tag()
export const Search = tag.union([
  ChangeQuery,
  ReceiveError,
  ReceiveResults
])

export function update (msg, state) {
  return Search.match(msg, [
    ChangeQuery, query => [{
      ...state,
      searchQuery: query,
      isLoading: true
    }, fetchResults(query)],
    ReceiveResults, results => [{
      ...state,
      searchResults: results,
      isLoading: false,
      error: null
    }],
    ReceiveError, error => [{
      ...state,
      error,
      isLoading: false
    }]
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
  return react.program(React.Component, () => ({
    init,
    update,
    view
  }))
}
