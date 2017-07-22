import React from 'react'
import message from 'raj/message'
import react from 'raj/react'

export function init () {
  return {
    makeId: null,
    isLoading: false,
    models: []
  }
}

export const SetMake = message()
export const ReceiveModels = message()
export const Msg = message.union([
  SetMake,
  ReceiveModels
])

export function update (msg, state) {
  return Msg.match(msg, [
    SetMake, id => {
      return [
        {...state, makeId: id, isLoading: true},
        loadModelsForMake(id, ReceiveModels)
      ]
    },
    ReceiveModels, models => [{
      ...state,
      models,
      isLoading: false
    }]
  ])
}

export function loadModelsForMake (id, message) {
  return function (dispatch) {
    window.fetch(`/models?id=${id}`)
      .then(res => res.json())
      .then(res => {
        dispatch(message(res.models))
      })
  }
}

export function view (state, dispatch) {
  const makes = ['ford', 'honda', 'windows']
  return <div>
    <ul>
      {makes.map(make =>
        <li onClick={() => dispatch(SetMake(make))}>{make}</li>
      )}
    </ul>
    state.isLoading && <p>Loading models...</p>
    <ul>
      {state.models.map(model => <li>{model.name}</li>)}
    </ul>
  </div>
}

export default function main () {
  return react.program(React.Component, {
    init,
    update,
    view
  })
}
